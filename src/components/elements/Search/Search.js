import React, { useState, useEffect, useRef } from "react";
import { identityFetchAllData, identityFetchPaginatedData, updateFilters } from '../../../redux/actions/actions'
import styles from './Search.module.css'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Pagination  from '../Pagination/Pagination';
import appStyles from '../App/App.module.css';
import publicationStyles from '../Publication/Publication.module.css';
import { useSession } from 'next-auth/client';
import ToastContainerWrapper from "../ToastContainerWrapper/ToastContainerWrapper";
import SearchBar from "./SearchBar";
import FilterReview from "./FilterReview";
import fetchWithTimeout from "../../../pages/fetchWithTimeout";
import { Button, Table } from "react-bootstrap";


const Search = () => {

    const [session,loading] = useSession();
    const router = useRouter()
    const dispatch = useDispatch()

    const identityAllData = useSelector((state) => state.identityAllData)
    const identityAllFetching = useSelector((state) => state.identityAllFetching)
    const identityPaginatedData = useSelector((state) => state.identityPaginatedData)
    const filters = useSelector((state) => state.filters)
    const errors = useSelector((state) => state.errors)
    const auth = useSelector((state) => state.auth)

    const [sort, setSort] = useState("0")
    const [identitySearch, setIdentitySearch] = useState("")
    const [identityData, setIdentityData] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(20)
    const [filterByPending, setFilterByPending] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    //ref
    const searchValue = useRef()

    useEffect(() => {
        dispatch(identityFetchAllData())
        dispatch(identityFetchPaginatedData(page, count))
        fetchCount()
    },[])


    const handlePaginationUpdate = (eventKey, page, updateCount) => {
        let updatedCount = count
        setPage(page)

        if (updateCount) {
            setCount(eventKey)
            updatedCount = eventKey
        }

        if (Object.keys(filters).length === 0) {
          dispatch(identityFetchPaginatedData(page, updatedCount))
        }
    }

    const handleSearchUpdate = e => {
        setIdentitySearch(e.target.value)
    }

    const handleFilterUpdate = filterState => {
        setSearch(filterState.search)
        setPage(1)
    }

    const handleRedirect = uid => {
        return router.push('/app/' + uid)
    }

    const filter = () => {
        var from = (parseInt(page, 10) - 1) * parseInt(count, 10);
        var to = from + parseInt(count, 10) - 1;
        var identities = [];
        var i = from;
        for (i; i <= to; i++) {
            if(identityData !== undefined && identityData.length > 0) {
                if (identityData[i] !== undefined) {
                    identities.push(identityData[i]);
                }
            } else {
                if (identityAllData[i] !== undefined) {
                    identities.push(identityAllData[i]);
                }
            }
            
        }
        return {
            paginatedIdentities: identities
        }
    }

    const fetchCount = () => {
      fetchWithTimeout('/api/db/users/count', {
        credentials: "same-origin",
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        }
      }, 300000)
      .then(response => {
          if(response.status === 200) {
              return response.json()
          }else {
              throw {
                  type: response.type,
                  title: response.statusText,
                  status: response.status,
                  detail: "Error occurred with api " + response.url + ". Please, try again later "
              }
          }
      })
      .then(data => {
        if (data.countPersonIdentifier) {
          setTotalCount(data.countPersonIdentifier);
        }
      }) 
      .catch(error => {
          console.log(error)
      })
    }

    const searchData = (searchText, orgUnits, institutions) => {
        setIdentityData(identityAllData)
        setIdentitySearch(searchText)
        if(identityAllData !== undefined) {
            var searchResults = identityAllData
            let updatedFilters = {};

            if (searchText) {
              searchResults = identityAllData.filter(identity => {
                  if(identity.id === searchText 
                      || 
                      (identity.firstName && identity.firstName.toLowerCase().includes(searchText.toLowerCase()))
                      ||
                      (identity.lastName && identity.lastName.toLowerCase().includes(searchText.toLowerCase()))) {
                      return identity
                  }
              })
              let filterSearchText = {...updatedFilters, searchText: searchText};
              updatedFilters = filterSearchText;
            }

            if (orgUnits && orgUnits.length) {
              searchResults = searchResults.filter(identity => {
                return orgUnits.includes(identity.primaryOrganizationalUnit)
              })
              let filterOrgUnits = {...updatedFilters, orgUnits: orgUnits};
              updatedFilters = filterOrgUnits;
            }

            if (institutions && institutions.length) {
              searchResults = searchResults.filter(identity => {
                return institutions.includes(identity.primaryInstitution)
              })
              let filterInstitutions = {...updatedFilters, institutions: institutions};
              updatedFilters = filterInstitutions;
            }

            dispatch(updateFilters(updatedFilters));
            setTotalCount(searchResults.length);
            setIdentityData(searchResults);
            setPage(1);
        }
    }

    const handlePendingFilterUpdate = (value) => {
      setFilterByPending(true);
      if (identityAllData !== undefined) {
        let searchResults = [];
        searchResults = identityAllData.filter(identity => {
          return identity.countPendingArticles > 0;
        })
      }
    }

    const identities = filter()

    if(errors && errors.length > 0) {
        return (
            <div className={appStyles.mainContainer}>

                {/* <div className="side-nav-position">
                    <SideNav uid={this.props.match.params.uid} history={this.props.history} />
                </div> */}
                <div>
                    {/* <Error {...errors} /> */}
                </div>
                
            </div>
        );
    }
    if (identityPaginatedData.length <= 0) {
        return (
                <div className={appStyles.appLoader}> </div>
        );
    } else {
        //const thisObject = this
        let tableBody
        let paginatedIdentities = Object.keys(filters).length === 0 ? identityPaginatedData : identities.paginatedIdentities;
        tableBody = paginatedIdentities.map(function (identity, identityIndex) {
            return <tr key={identityIndex}>
                <td key="0" width="20%">
                    <Name identity={identity}></Name>
                </td>
                <td key="1" width="20%">
                    {identity.primaryOrganizationalUnit && <div>{identity.primaryOrganizationalUnit}</div>}
                </td>
                <td key="2" width="20%">
                    {identity.primaryInstitution && <div>{identity.primaryInstitution}</div>}
                </td>
                <td key="3" width="20%">
                    {identity.countPendingArticles && <div>{identity.countPendingArticles}</div>}
                </td>
                <td key="4" width="20%">
                    <Button className={styles.tableButton}>Curate Publications</Button>
                </td>
            </tr>;
        }) 
        return (
            <div className={appStyles.mainContainer}>
                {/* <div className="side-nav-position">
                    <SideNav uid={this.props.match.params.uid} history={this.props.history} />
                </div> */}
                <div className={styles.searchContentContainer}>
                    <div className={styles.searchBar}>
                      <h1>Find People</h1>
                      <SearchBar searchData={searchData}/>
                        <div>
                            <br/>
                            <div className="row mx-3">
                                <div className="col-md-4">
                                    <h3>Number of results: <strong>{totalCount}</strong></h3>
                                </div>
                            </div>
                            <React.Fragment>
                                <Pagination total={totalCount} page={page}
                                            count={count}
                                            onChange={handlePaginationUpdate}/>
                                <div className="table-responsive">
                                    <Table className={`${publicationStyles.h6fnhWdegPublicationsEvidenceTable} ${styles.table} table`}>
                                        <thead>
                                            <tr>
                                                <th key="0">Name</th>
                                                <th key="1">Organization</th>
                                                <th key="2">Institution</th>
                                                <th key="3">Pending</th>
                                                <th key="4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableBody}
                                        </tbody>
                                    </Table>
                                </div>
                                <Pagination total={totalCount} page={page}
                                            count={count}
                                            onChange={handlePaginationUpdate}/>
                            </React.Fragment>
                            <ToastContainerWrapper />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function List(props) {
    if(props.list === undefined || props.list === null || props.list === "") {
        return null
    } 
    let listArray = []
    if(props.orgUnit === "true") {
        props.list.map((item, idx) => {
            listArray.push(<li key={idx}>{item.organizationalUnitLabel}</li>)
        })
    } else {
        props.list.map((item, idx) => {
            listArray.push(<li key={idx}>{item}</li>)
        })
    }
    return(
        (<ul>{listArray}</ul>)
    )
}

function Name(props) {
    let nameArray = []
    let imageUrl = ''
    if(props.identity.identityImageEndpoint !== undefined) {
        if(props.identity.identityImageEndpoint.length > 0) 
            imageUrl = props.identity.identityImageEndpoint
        else
            imageUrl = '../../../images/generic-headshot.png'
    }
    if(props.identity.firstName !== undefined) {
        const nameString = props.identity.firstName + ((props.identity.middleName !== undefined) ? ' ' + props.identity.middleName + ' ' : ' ') + props.identity.lastName
        nameArray.push(<p key="0"> <a href={`/app/${props.identity.personIdentifier}`} target="_blank" rel="noreferrer">
            <b>{nameString}</b>
            </a></p>)
        
    }
    if(props.title !== undefined) {
        nameArray.push(<p key="1"><span>{props.title}</span></p>)
    }
    return (
        nameArray
    )
}



export default Search

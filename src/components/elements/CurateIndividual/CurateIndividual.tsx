import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { identityFetchData, reciterFetchData } from "../../../redux/actions/actions";
import Loader from "../Common/Loader";
import fullName from "../../../utils/fullName";
import { Container, Button, Row } from "react-bootstrap";
import appStyles from '../App/App.module.css';
import styles from "./CurateIndividual.module.css";
import InferredKeywords from "./InferredKeywords"
import SuggestionsBanner from "./SuggestionsBanner";
import ReciterTabs from "./ReciterTabs";
import Image from "next/image";
import Profile from "../Profile/Profile";

interface PrimaryName {
  firstInitial?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  middleInitial?: string,
}

const CurateIndividual = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();
  const identityData = useSelector((state: RootStateOrAny) => state.identityData)
  const identityFetching = useSelector((state: RootStateOrAny) => state.identityFetching)
  const reciterData = useSelector((state: RootStateOrAny) => state.reciterData)
  const reciterFetching = useSelector((state: RootStateOrAny) => state.reciterFetching)
  const [displayImage, setDisplayImage] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(identityFetchData(id));
    dispatch(reciterFetchData(id, false));
  }, [])

  const DisplayName = ({ name } : { name: PrimaryName}) => {
    let formattedName = fullName(name);
    return (
      <h2>{formattedName}</h2>
    )
  }

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  if (identityFetching || reciterFetching) {
    return (
      <Loader />
    )
  }

  return (
    <div className={appStyles.mainContainer}>
      <h1 className={styles.header}>Curate Publications</h1>
      {
        identityData &&
        <Container className="indentity-data-container" fluid={true}>
          <div className="d-flex">
          {
            displayImage &&
            <div className={styles.profileImgWrapper}>
              <Image
                src={identityData.identityImageEndpoint}
                alt="Profile photo"
                width={144}
                height={217}
                onError={() => setDisplayImage(false)}
                />
            </div>
          }
          <div className="flex-grow-1">
            <DisplayName 
              name={identityData.primaryName}
            />
            <b>{identityData.title}</b>
            <p className={styles.greyText}>{identityData.primaryOrganizationalUnit}</p>
            {reciterData && reciterData.reciter &&
              <InferredKeywords
                reciter={reciterData.reciter}
                />
            }
            <Button className="transparent-btn" onClick={handleShow}>View Profile</Button>
          </div>
          </div>
        </Container>
      }
      { reciterData.reciterPending && reciterData.reciterPending.length > 0 &&
        <SuggestionsBanner
          uid={id}
          count={reciterData.reciterPending.length}
        />
      }
      <ReciterTabs 
        reciterData={reciterData}
        fullName={fullName(identityData.primaryName)}
      /> 
        <Profile 
          uid={identityData.uid}
          modalShow={modalShow}
          handleShow={handleShow}
          handleClose={handleClose}
        />
    </div>
  )
}

export default CurateIndividual;
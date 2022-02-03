import React, { useState, FunctionComponent } from "react"
import styles from './Publication.module.css';
import ReactTooltip from 'react-tooltip';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import type { Author } from '../../../../types/Author';
import { useRouter } from 'next/router';
import { useSelector, RootStateOrAny } from "react-redux";
import Publication from "./Publication";
import { reciterConfig } from "../../../../config/local";
import Divider from "../Common/Divider";
import Profile from "../Profile/Profile";

//TEMP: update to required
interface FuncProps {
    onAccept?(id: number): void,
    onReject?(id: number): void,
    onUndo?(id: number): void,
    item: any,
    faculty?: any,
    key: number,
    index: number,
    feedbacklogGroup: any,
}

const PublicationsPane: FunctionComponent<FuncProps> = (props) => {

    const [countPendingArticles, setCountPendingArticles] = useState<number>(props.item.countPendingArticles || 0)
    const filteredIdentities = useSelector((state: RootStateOrAny) => state.filteredIdentities)
    const [articles, setArticles] = useState<any[]>(props.item.reCiterArticleFeatures)
    const [modalShow, setModalShow] = useState(false);
    const feedbacklog = props.feedbacklogGroup.find(feedback => feedback.hasOwnProperty(props.item.personIdentifier)) || {};

    const router = useRouter()

    const maxArticlesPerPerson = reciterConfig.reciter.featureGeneratorByGroup.featureGeneratorByGroupApiParams.maxArticlesPerPerson;

    // TODO
    const acceptPublication = ( pmid: number, index: number ) => {

        if ( countPendingArticles > 0 ) {
          setCountPendingArticles(countPendingArticles - 1);
        }
        // props.onAccept(pmid);
        let updatedArticlesList = articles.filter((article) => { article.pmid !== pmid});
        setArticles(updatedArticlesList);
    }

    //TODO
    const rejectPublication = (pmid: number, index: number) => {
      if ( countPendingArticles > 0 ) {
        setCountPendingArticles(countPendingArticles - 1);
      }
      props.onReject(pmid)
    }

    const undoPublication = (pmid: number, index: number) => {
      setCountPendingArticles(countPendingArticles + 1);
      props.onUndo(pmid)
    }

    const handleProfileClick = (uid: string) => {
      return router.push('/curate/' + uid)
    }

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const { item } = props;

    return (
      <Container className={`${styles.publicationContainer} p-0`} fluid key={props.key}>
        <Accordion defaultActiveKey={props.index === 0 ? "0" : "1"}>
         <Accordion.Item eventKey="0">
          <Accordion.Header className={styles.publicationHeader}> 
            <Row>
              <Col md={8} className={styles.facultyHeader}>
                {filteredIdentities[item.personIdentifier] && <p><span className={styles.facultyTitle}>{filteredIdentities[item.personIdentifier].fullName}</span>{filteredIdentities[item.personIdentifier].title}</p>}
              </Col>
              <Col md={3}>
                <div className={styles.publicationRowButtons}>
                  <Button onClick={handleShow}>
                    View Profile
                  </Button>
                  <Button onClick={() => handleProfileClick(item.personIdentifier)}>
                    {`View All ${countPendingArticles} Pending`}
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body> 
          {
            (item.reCiterArticleFeatures.length === 0 || countPendingArticles === 0) &&
              <div className="d-flex justify-content-center">
                <p className="text-align-center">No pending publications</p>
              </div>
          }
          {item.reCiterArticleFeatures.length > 0 &&
            articles.map((article: any, index: number) => {
              return(
                <>
                  <Publication
                    key={index.toString()}
                    index={index}
                    reciterArticle={article}
                    personIdentifier={item.personIdentifier}
                    onAccept={acceptPublication}
                    fullName={filteredIdentities[item.personIdentifier] ? filteredIdentities[item.personIdentifier].fullName : ''}
                    feedbacklog={feedbacklog[item.personIdentifier] ? feedbacklog[item.personIdentifier] : {}}
                    />
                    {index < articles.length - 1 && <Divider></Divider>}
                </>
              )
            })
            }
            {
              countPendingArticles > maxArticlesPerPerson && 
              <Row>
                <Divider></Divider>
                <div className={`d-flex justify-content-center ${styles.publicationRowButtons}`}>
                  <Button onClick={() => handleProfileClick(item.personIdentifier)}>View All</Button>
                </div>
              </Row>
            }
         </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Profile 
        uid={item.personIdentifier}
        modalShow={modalShow}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </Container>
  ); 
}

export default PublicationsPane;
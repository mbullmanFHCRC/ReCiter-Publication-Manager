const methods = {
    RECITER_FETCH_DATA: "RECITER_FETCH_DATA",
    RECITER_CANCEL_FETCHING: "RECITER_CANCEL_FETCHING",
    RECITER_CLEAR_DATA: "RECITER_CLEAR_DATA",
    RECITER_CHANGE_DATA: "RECITER_CHANGE_DATA",
    PUBMED_FETCH_DATA: "PUBMED_FETCH_DATA",
    PUBMED_CANCEL_FETCHING: "PUBMED_CANCEL_FETCHING",
    PUBMED_CLEAR_DATA: "PUBMED_CLEAR_DATA",
    PUBMED_CHANGE_DATA: "PUBMED_CHANGE_DATA",
    ADD_ERROR: "ADD_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    ACCEPT_PUBLICATION: "ACCEPT_PUBLICATION",
    REJECT_PUBLICATION: "REJECT_PUBLICATION",
    ACCEPT_PUBLICATION_GROUP: "ACCEPT_PUBLICATION_GROUP",
    REJECT_PUBLICATION_GROUP: "REJECT_PUBLICATION_GROUP",
    UNDO_PUBLICATION: "UNDO_PUBLICATION",
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    IDENTITY_FETCH_DATA: "IDENTITY_FETCH_DATA",
    IDENTITY_CANCEL_FETCHING: "IDENTITY_CANCEL_FETCHING",
    IDENTITY_CHANGE_DATA: "IDENTITY_CHANGE_DATA",
    IDENTITY_CLEAR_DATA: "IDENTITY_CLEAR_DATA",
    IDENTITY_FETCH_ALL_DATA: "IDENTITY_FETCH_ALL_DATA",
    IDENTITY_CANCEL_ALL_FETCHING: "IDENTITY_CANCEL_ALL_FETCHING",
    IDENTITY_CHANGE_ALL_DATA: "IDENTITY_CHANGE_ALL_DATA",
    IDENTITY_CLEAR_ALL_DATA: "IDENTITY_CLEAR_ALL_DATA",
    IDENTITY_FETCH_PAGINATED_DATA: "IDENTITY_FETCH_PAGINATED_DATA",
    IDENTITY_CANCEL_PAGINATED_FETCHING: "IDENTITY_CANCEL_PAGINATED_FETCHING",
    IDENTITY_CHANGE_PAGINATED_DATA: "IDENTITY_CHANGE_PAGINATED_DATA",
    IDENTITY_CLEAR_PAGINATED_DATA: "IDENTITY_CLEAR_PAGINATED_DATA",
    GET_SESSION_ID: "GET_SESSION_ID",
    ORGUNITS_CHANGE_ALL_DATA: "ORGUNITS_CHANGE_ALL_DATA",
    ORGUNITS_CANCEL_ALL_FETCHING: "ORGUNITS_CANCEL_ALL_FETCHING",
    ORGUNITS_CLEAR_ALL_DATA: "ORGUNITS_CLEAR_ALL_DATA",
    ORGUNITS_FETCH_ALL_DATA: "ORGUNITS_FETCH_ALL_DATA",
    INSTITUTIONS_CHANGE_ALL_DATA: "INSTITUTIONS_CHANGE_ALL_DATA",
    INSTITUTIONS_CANCEL_ALL_FETCHING: "INSTITUTIONS_CANCEL_ALL_FETCHING",
    INSTITUTIONS_CLEAR_ALL_DATA: "INSTITUTIONS_CLEAR_ALL_DATA",
    INSTITUTIONS_FETCH_ALL_DATA: "INSTITUTIONS_FETCH_ALL_DATA",
    PERSON_TYPES_CHANGE_ALL_DATA: "PERSON_TYPES_CHANGE_ALL_DATA",
    PERSON_TYPES_ALL_DATA: "PERSON_TYPES_CHANGE_ALL_DATA",
    PERSON_TYPES_CANCEL_ALL_FETCHING: "PERSON_TYPES_CANCEL_ALL_FETCHING",
    PERSON_TYPES_CLEAR_ALL_DATA: "PERSON_TYPES_CLEAR_ALL_DATA",
    PERSON_TYPES_FETCH_ALL_DATA: "PERSON_TYPES_FETCH_ALL_DATA",
    FILTERS_CHANGE: "FILTERS_CHANGE",
    FILTERS_CLEAR: "FILTERS_CLEAR",
    FILTERED_IDS_CLEAR: "FILTERED_IDS_CLEAR",
    FILTERED_IDS_CHANGE: "FILTERED_IDS_CHANGE",
    PUBLICATIONS_FETCH_GROUP_DATA: "PUBLICATIONS_FETCH_GROUP_DATA",
    PUBLICATIONS_CHANGE_GROUP_DATA: "PUBLICATIONS_CHANGE_GROUP_DATA",
    PUBLICATIONS_CANCEL_GROUP_DATA: "PUBLICATIONS_CANCEL_GROUP_DATA",
    PUBLICATIONS_FETCH_MORE_DATA: "PUBLICATIONS_CANCEL_MORE_DATA",
    PUBLICATIONS_FETCH_PREVIOUS_DATA: "PUBLICATIONS_FETCH_PREVIOUS_DATA",
    PUBLICATIONS_PREVIOUS_GROUP_DATA: "PUBLICATIONS_PREVIOUS_GROUP_DATA",
    PUBLICATIONS_UPDATE_GROUP_DATA: "PUBLICATIONS_UPDATE_GROUP_DATA",
    PUBLICATIONS_UPDATE_GROUP_DATA_IDS: "PUBLICATIONS_UPDATE_GROUP_DATA_IDS",
    PUBLICATIONS_CLEAR_GROUP_DATA_IDS: "PUBLICATIONS_CLEAR_GROUP_DATA_IDS",
    FILTERED_IDENTITIES_CLEAR: "FILTERED_IDENTITIES_CLEAR",
    FILTERED_IDENTITIES_CHANGE: "FILTERED_IDENTITIES_CHANGE",
    FEEDBACKLOG_FETCH_DATA: "FEEDBACKLOG_FETCH_DATA",
    FEEDBACKLOG_CHANGE_DATA: "FEEDBACKLOG_CHANGE_DATA",
    FEEDBACKLOG_CANCEL_FETCHING: " FEEDBACKLOG_CANCEL_FETCHING",
    FEEDBACKLOG_CLEAR_DATA: "FEEDBACKLOG_CLEAR_DATA",
    FEEDBACKLOG_FETCH_DATA_GROUP: "FEEDBACKLOG_FETCH_DATA_GROUP",
    FEEDBACKLOG_CHANGE_DATA_GROUP: "FEEDBACKLOG_CHANGE_DATA_GROUP",
    FEEDBACKLOG_CANCEL_FETCHING_GROUP: "FEEDBACKLOG_CANCEL_FETCHING_GROUP",
    FEEDBACKLOG_CLEAR_DATA_GROUP: "FEEDBACKLOG_CLEAR_DATA_GROUP",
}

export default methods
const methods = {
    RECITER_FETCH_DATA: "RECITER_FETCH_DATA",
    RECITER_CANCEL_FETCHING: "RECITER_CANCEL_FETCHING",
    RECITER_CLEAR_DATA: "RECITER_CLEAR_DATA",
    RECITER_CHANGE_DATA: "RECITER_CHANGE_DATA",
    PUBMED_FETCH_DATA: "PUBMED_FETCH_DATA",
    PUBMED_CANCEL_FETCHING: "PUBMED_CANCEL_FETCHING",
    PUBMED_CLEAR_DATA: "PUBMED_CLEAR_DATA",
    PUBMED_CHANGE_DATA: "PUBMED_CHANGE_DATA",
    PUBMED_FETCH_DATA_MORE : "PUBMED_FETCH_DATA_MORE",
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
    ARTICLE_FILTER_CLEAR_ALL_DATA: "ARTICLE_FILTER_CLEAR_ALL_DATA",
    ARTICLE_FILTER_CHANGE_ALL_DATA: "ARTICLE_FILTER_CHANGE_ALL_DATA",
    AUTHOR_FILTER_CLEAR_ALL_DATA: "AUTHOR_FILTER_CLEAR_ALL_DATA",
    AUTHOR_FILTER_CHANGE_ALL_DATA: "AUTHOR_FILTER_CHANGE_ALL_DATA",
    AUTHOR_FILTER_CHANGE_FROM_SEARCH: "AUTHOR_FILTER_CHANGE_FROM_SEARCH",
    DATE_FILTER_CLEAR_ALL_DATA: "DATE_FILTER_CLEAR_ALL_DATA",
    DATE_FILTER_CHANGE_ALL_DATA: "DATE_FILTER_CHANGE_ALL_DATA",
    JOURNAL_FILTER_CLEAR_ALL_DATA: "JOURNAL_FILTER_CLEAR_ALL_DATA",
    JOURNAL_FILTER_CHANGE_ALL_DATA: "JOURNAL_FILTER_CHANGE_ALL_DATA",
    JOURNAL_RANK_CLEAR_ALL_DATA: "JOURNAL_RANK_CLEAR_ALL_DATA",
    JOURNAL_RANK_CHANGE_ALL_DATA: "JOURNAL_RANK_CHANGE_ALL_DATA",
    REPORTING_FILTERS_SET_LOADING: "REPORTING_FILTERS_SET_LOADING",
    REPORTING_FILTERS_CANCEL_LOADING: "REPORTING_FILTERS_CANCEL_LOADING",
    PUB_FILTER_UPDATE: "PUB_FILTER_UPDATE",
    PUB_FILTER_CLEAR: "PUB_FILTER_CLEAR",
    PUB_POPULATE_SEARCH_FILTERS: "PUB_POPULATE_SEARCH_FILTERS",
    REPORTS_SEARCH_UPDATE: "REPORTS_SEARCH_UPDATE",
    REPORTS_SEARCH_FETCHING: "REPORTS_SEARCH_FETCHING",
    REPORTS_SEARCH_CANCEL_FETCHING: "REPORTS_SEARCH_CANCEL_FETCHING",
    REPORTS_SEARCH_PAGINATED_FETCHING: "REPORTS_SEARCH_PAGINATED_FETCHING",
    REPORTS_SEARCH_PAGINATED_CANCEL_FETCHING: "REPORTS_SEARCH_PAGINATED_CANCEL_FETCHING",
    REPORTS_RESULTS_IDS_UPDATE: "REPORTS_RESULTS_IDS_UPDATE",
    REPORTS_RESULTS_IDS_CLEAR: "REPORTS_RESULTS_IDS_CLEAR",
    REPORTS_RESULTS_IDS_LOADING: "REPORTS_RESULTS_IDS_LOADING",
    REPORTS_RESULTS_IDS_CANCEL_LOADING: "REPORTS_RESULTS_IDS_CANCEL_LOADING",
    CURATE_IDS_FROM_SEACH_PAGE : "CURATE_IDS_FROM_SEACH_PAGE",
    INDIVIDUVAL_CURATE_IDS_SEARCH_TEXT : " INDIVIDUVAL_CURATE_IDS_SEARCH_TEXT",
    PUBMED_RECORDS_COUNT : "PUBMED_RECORDS_COUNT",
    LIST_ALL_ADMIN_DEPARTMENTS : "LIST_ALL_ADMIN_DEPARTMENTS",
    LIST_ALL_ADMIN_ROLES : "LIST_ALL_ADMIN_ROLES",
    ADMIN_USERS_LIST : "ADMIN_USERS_LIST",
    CREATE_ADMIN_USER: "CREATE_ADMIN_USER",
    UPDATE_ADMIN_USER: "UPDATE_ADMIN_USER",
    CREATED_OR_UPDATED_USERID: "CREATED_OR_UPDATED_USERID",
    SHOW_EVIDENCE_DEFAULT : "SHOW_EVIDENCE_DEFAULT",
    INDIVIDUAL_PERSON_REPORT_CRITERIA: "INDIVIDUAL_PERSON_REPORT_CRITERIA",
    REPORTS_FILTER_CLEAR: "REPORTS_FILTER_CLEAR",
    REPORTS_SEARCH_CLEAR: "REPORTS_SEARCH_CLEAR",
    ADMIN_SETTINGS_LIST : "ADMIN_SETTINGS_LIST",
    ADMIN_SETTINGS_UPDATED_LIST : "ADMIN_SETTINGS_UPDATED_LIST",
    NOTIFICATION_EMAIL_CARRIER : "NOTIFICATION_EMAIL_CARRIER",
    NOTIFICATION_PREFERENCE_SAVE_LOADING : "NOTIFICATION_PREFERENCE_SAVE_LOADING",
    NOTIFICATION_PREFERENCE_SAVE_CANCEL_LOADING : "NOTIFICATION_PREFERENCE_SAVE_CANCEL_LOADING"
}

export default methods

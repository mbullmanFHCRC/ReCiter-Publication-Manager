import React, { useState, ChangeEvent } from "react";
import { Button, Row, Form, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./CurateIndividual.module.css";

interface FilterPubSectionProps {
  searchTextUpdate: (searchText: string) => void
  sortUpdate: (sort: string) => void
}

const FilterPubSection: React.FC<FilterPubSectionProps> = (props) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (e: any) =>{
    setSearchText(e.target.value);
    props.searchTextUpdate(e.target.value);
  }

  const handleSortChange = (e: string) => {
    props.sortUpdate(e);
  }

  return (
    <div className={`${styles.filterPubSection} py-4 d-flex justify-content-between`}>
      <div className="filter-section-buttons d-flex flex-basis-content">
        <Button className="m-2" variant="primary">Accept All</Button>
        <Button className={`m-2 ${styles.whiteBtn}`} variant="outline-primary">Reject All</Button>
      </div>
      <div className="d-flex align-items-end">
        <Form className="d-flex flex-basis-content mx-2">
          <Form.Control type="text" placeholder="Filter..." value={searchText} onChange={(e) => handleInputChange(e)}/>
        </Form>
        <DropdownButton className={`${styles.basicDropdown} mx-2`} title="Sort by" id="dropdown-basic-button" onSelect={(eventKey) => handleSortChange(eventKey)}>
          <Dropdown.Item eventKey="1">Sort by Score</Dropdown.Item>
          <Dropdown.Item eventKey="2">Sort by Date</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default FilterPubSection
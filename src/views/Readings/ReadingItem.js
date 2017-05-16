/*
 * React element that describes a single reading entry in a reading list
 */
import React from 'react';
import {Row,
} from 'react-bootstrap';
import {Link,
} from 'react-router-dom';
import './ReadingItem.css';

export default function(props) {
    let childProps = {
        title: props.item.title,
    };
    const readingUrl = '/reading/'+props.item.readingId;
    return (
        <div>
            <Row className="title-container">
                <h1 className="title">
                    <Link key={props.item.readingId} to={readingUrl}>
                        {props.item.title}
                        </Link>
                </h1>
            </Row>
            <hr></hr>
        </div>
    )
}

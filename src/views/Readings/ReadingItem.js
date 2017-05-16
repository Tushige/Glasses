/*
 * React element that describes what a single reading entry in a row looks like
 */
import React from 'react';
import {Row,
} from 'react-bootstrap';
import {Link,
} from 'react-router-dom';

export default function(props) {
    let childProps = {
        title: props.item.title,
    };
    const readingUrl = '/reading/'+props.item.readingId;
    return (
        <div>
            <Row>
                <Link key={props.item.readingId} to={readingUrl}>
                    {props.item.title}
                </Link>
            </Row>
        </div>
    )
}

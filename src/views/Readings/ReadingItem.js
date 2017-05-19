/*
 * React element that describes a single reading entry in a reading list
 */
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row,
} from 'react-bootstrap';
import {Link,
} from 'react-router-dom';
import './ReadingItem.css';

export default function(props) {
    const readingUrl = '/reading/'+props.item.readingId;
    return (
        <div>
            <Row className="title-container">
                <CSSTransitionGroup
                    transitionName="readingItem-animation"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <h1 className="title">
                        <Link key={props.item.readingId} to={readingUrl}>
                            {props.item.title}
                            </Link>
                    </h1>
                </CSSTransitionGroup>
            </Row>
            <hr></hr>
        </div>
    )
}

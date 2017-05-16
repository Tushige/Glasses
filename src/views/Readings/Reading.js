/*
 * React element that describes what a single reading entry looks like
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getReading} from '../../libs/serverAPI';
import {Grid,
        Row,
        Button
} from 'react-bootstrap';
import './reading.css';

class Reading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reading: null,
        }
    }
    /*
     * get the reading object from the back end
     */
    componentWillMount() {
        // get the reading object from the back end
        const readingId = this.props.match.params.id;
        const userToken = this.props.childProps.userToken;
        let getPromise = getReading(userToken, readingId);
        getPromise.then((readingData) => {
            this.setState({
                reading: readingData,
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    render() {
        const reading = this.state.reading? this.state.reading : "not found";
        return (
            <div>
                <Grid id="reading-container">
                    <Row>
                        <h1 id="title">Title: {reading.title}</h1>
                    </Row>
                    <Row>
                        <h1 id="link">Link: <a href={reading.link}>{reading.link}</a></h1>
                    </Row>
                    <Row>
                        <h1 id="memo">memo: {reading.memo}</h1>
                    </Row>
                    <Row>
                        <h1 id="attachment">attachment: {reading.attachment ? reading.attachment:"no attachment"}</h1>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Reading);

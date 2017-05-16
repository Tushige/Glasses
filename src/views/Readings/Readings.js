import React, {Component} from 'react';
import {getAllReadings} from '../../libs/serverAPI';
import ReadingItem from './ReadingItem';

import {Grid,

} from 'react-bootstrap';
import './Readings.css';
class Readings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            readings: null,
        };
    }

    /*
     * retrieve reading list before rendering
     */
    componentWillMount() {
        let getAllPromise = getAllReadings(this.props.childProps.userToken);
        getAllPromise.then((readingList) => {
            this.setState({
                readings: readingList,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render() {
        let readings = this.state.readings;
        let readingItems = null;
        /* while readingItems is not available, display loading bar*/
        let view = (
                <i id="page-loading-bar" className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>
        );
        /*create a list of <ReadingItem>*/
        if (readings) {
            readingItems = readings.map((reading) => {
                return <ReadingItem key={reading.readingId} item={reading}/>
            });
        }
        /*display readingItems if it's available*/
        if (readingItems) {
            view = (
                <Grid id="grid">
                    {readingItems}
                </Grid>
            )
        }
        return (
            <div>
                {view}
            </div>
        );
    }
}

export default Readings;

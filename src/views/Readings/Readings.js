import React, {Component} from 'react';
import {getAllReadings} from '../../libs/serverAPI';
import ReadingItem from './ReadingItem';

import {Grid,

} from 'react-bootstrap';
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
        if (readings) {
            readingItems = readings.map((reading) => {
                return <ReadingItem item={reading}/>
            });
        }
        return (
            <Grid id="grid">
                {readingItems}
            </Grid>
        );
    }
}

export default Readings;

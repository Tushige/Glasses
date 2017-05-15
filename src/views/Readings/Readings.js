import React, {Component} from 'react';
import {getAllReadings} from '../../libs/serverAPI';

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
                return <li key={reading.readingId}>{reading.title}</li>
            });
        }
        return (
            <h1>{readingItems}</h1>
        );
    }
}

export default Readings;

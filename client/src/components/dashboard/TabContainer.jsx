import React from 'react';
import Tab from './Tab';
import './TabContainer.css';

export default class TabContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    render() {
        const { headers, content } = this.props;
        const { selected } = this.state;

        const btns = headers.map((h, i) => {
            const onclick = (e) => {
                this.setState({
                    selected: i,
                });
            }
            return <button key={i} onClick={onclick} className={`tab-header ${selected === i ? 'tab-header-selected' : ''}`}>{h}</button>
        });
        const tabs = content.map((c, i) => {
            return <Tab isShown={selected === i}>{c}</Tab>;
        });
        return (
            <div className="tab-container">
                <div className="tab-headers">
                    {btns}
                </div>
                <div className="tab-content">
                    <ul>{tabs}</ul>
                </div>
            </div>
        )
    }
}
import { React } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogArea = styled.div`
    background-color: #9AA88F;
    width: 400px;
    margin: 0px 20px 5px 60px;
    border-radius: 15px;
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: #F6EDE0;
`;

const DataArea = styled.div`
    margin: 0px 15px 0px 15px;
    background-color: #F6EDE0;
    width: 370px;
    height: 600px;
    border-radius: 10px;
`;

const LogSting = styled.div`
    white-space: pre-wrap;
    width: 370px;
    height: 100%;
    overflow: scroll;

    ::-webkit-scrollbar {
    width:12px;
    }

    ::-webkit-scrollbar-track {
        border-radius:10px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0.1);
    }

    ::-webkit-scrollbar-corner {
        background: rgba(0,0,0,0);
    }
`;

const Log = (props) => {
    const { resultData: data } = props;
    return (
        <LogArea>
            <Title>Log</Title>
            <DataArea>
                <LogSting>{Object.keys(data).length === 0 ? 'No data' : data.log}</LogSting>
            </DataArea>
        </LogArea>
    );
}

Log.propTypes = {
    resultData: PropTypes.shape({
        log: PropTypes.string
    })
}

export default Log;
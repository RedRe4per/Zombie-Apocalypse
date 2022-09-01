import { React, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const HeaderBar = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    background-color: rgba(57, 124,	194);
    padding: 10px 0px;
    border-radius: 10px;
    margin: 5px 10px 8px 10px;
`;

const Title = styled.h3`
    margin-top: 0px;
`;

const FixedInput = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-content: flex-start;
`;

const Input = styled.input`
    width: 35px;
    margin-left: 5px;
    margin-right: 10px;
    border-radius: 5px;
`;

const MoveInput = styled.input`
    width: 150px;
    margin-left: 5px;
    margin-right: 10px;
    border-radius: 5px;
`;

const Area = styled.div`
    margin: 0px 20px 0px 20px;
    padding: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 19px -11px rgba(255,255,255,0.83); 
    box-shadow: 0px 0px 19px -11px rgba(255,255,255,0.83);
`;

const FixedArea = styled.div`
    margin: 0px 20px 0px 20px;
    padding: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 19px -11px rgba(255,255,255,0.83); 
    box-shadow: 0px 0px 19px -11px rgba(255,255,255,0.83);
    width: 251px;
    height: 23px;
`;

const Initials = styled.span`
    font-size: large;
    font-weight: bold;
`;

const FlexibleInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
`;

const ButtonBar = styled.div`
    margin: 20px 0px 2px;
`;

const Button = styled.button`
    margin-left: 50px;
    margin-right: 50px;
    width: 150px;
    height: 30px;
    border-radius: 7px;
    background-color: #F6EDE0;
`;


const Header = (props) => {
    const { getResultData } = props;
    const [gridSize, setGridSize] = useState(4);
    const [zombiePosition, setZombiePosition] = useState({ x: 0, y: 0 });
    const [action, setAction] = useState('');
    const [creatures, setCreatures] = useState([{ x: 1, y: 1 }]);

    const addCreature = () => {
        setCreatures([...creatures, { x: 0, y: 0 }]);
    };

    const changeCreaturePosition = (e, index, coordinate) => {
        if (parseInt(e.target.value) >= gridSize || parseInt(e.target.value) < 0) return toast.info('x & y value must greater or equal than 0 and less than grid size!');
        let newCreatureArr = [...creatures];
        newCreatureArr[index][coordinate] = e.target.value;
        setCreatures([...newCreatureArr]);
    };

    const submit = () => {
        //verification
        let permission = true;
        const regex = /^[UDRLudrl]+$/;
        if (!regex.test(action)) return toast.error('Moves cannot be null, and can only include "UDRLudrl" characters.');
        if (zombiePosition.x >= gridSize || zombiePosition.y >= gridSize) return toast.error('Zombie position must be in grid.');
        creatures.forEach(creature => {
            if (creature.x >= gridSize || creature.y >= gridSize) {
                toast.error('Creature position must be in grid.');
                permission = false;
            }
        });
        if (!permission) return;
        if (creatures.findIndex(creature => creature.x === zombiePosition.x && creature.y === zombiePosition.y) > -1) {
            return toast.error('Initial position of zombie cannot in creature position.');
        }

        const dataObj = { gridSize, zombie: zombiePosition, creatures, commands: action };
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/v1/zombie',
            data: dataObj
        }).then(response => {
            getResultData(response.data);
            toast.success('Receive result successfully');
        }).catch(err => {
            if (err.response.data) {
                let errorMessage = (err.response.data.split('<pre>')[1]).split('</pre>')[0].split('&quot;').join('');
                return toast.error(errorMessage);
            }
            if (err.message) return toast.error(`${err.name}: ${err.message}`);
        });

    };

    return (
        <div>
            <HeaderBar>
                <Title>Zombie Apocalypse</Title>
                <FixedInput>
                    <Area>
                        <span>Grid: </span>
                        <Input type='number' value={gridSize} onChange={(e) => setGridSize(e.target.value)}></Input>
                    </Area>
                    <Area>
                        <span>Zombie position: x:</span>
                        <Input type='number' value={zombiePosition.x} onChange={(e) => setZombiePosition({ ...zombiePosition, x: e.target.value })}></Input>
                        <span>y:</span>
                        <Input type='number' value={zombiePosition.y} onChange={(e) => setZombiePosition({ ...zombiePosition, y: e.target.value })}></Input>
                    </Area>
                    <Area>
                        <span>Moves (<Initials>U</Initials>p, <Initials>D</Initials>own, <Initials>L</Initials>eft, <Initials>R</Initials>ight):</span>
                        <MoveInput type='string' value={action} onChange={(e) => setAction(e.target.value)}></MoveInput>
                    </Area>
                </FixedInput>
                <FlexibleInput>
                    {creatures.map((creature) => {
                        const index = creatures.indexOf(creature);
                        return (
                            <FixedArea key={index}>
                                <span>Creature {index + 1}: x:</span>
                                <Input type='number' value={creatures[index].x} onChange={(e) => changeCreaturePosition(e, index, 'x')}></Input>
                                <span>y:</span>
                                <Input type='number' value={creatures[index].y} onChange={(e) => changeCreaturePosition(e, index, 'y')}></Input>
                            </FixedArea>)
                    })}
                </FlexibleInput>
                <ButtonBar>
                    <Button onClick={addCreature}>More creature</Button>
                    <Button onClick={submit}>Submit</Button>
                </ButtonBar>
            </HeaderBar>
            <ToastContainer
                style={{ fontSize: "16px" }}
                theme="dark"
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>

    );
};

Header.propTypes = {
    getResultData: PropTypes.func
}

export default Header;
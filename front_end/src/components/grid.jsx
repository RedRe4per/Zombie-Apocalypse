import { React } from "react";
import styled from 'styled-components';
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';

const GridWrapper = styled.div`
    height: 710px;
    width: 710px;
    background-color: rgba(0,0,0,0.1);
    margin-left: 10px;
    margin-right: 20px;
    border-radius: 15px;
`;

const Info = styled.p`
    font-size: 20px;
`

const Grid = styled.div`
    margin: 10px;
    display: grid;
    height: 690px;
    width: 690px;
    grid-template-columns: repeat(${props => props.gridSize}, 1fr); 
    grid-template-rows: repeat(${props => props.gridSize}, 1fr);                    
`;

const GridElement = styled.div`
    background-color: #F6EDE0;
    border: 1px solid lightgray;
`;


const GridBox = (props) => {

    const { resultData: data } = props;
    if (Object.keys(data).length === 0) return <GridWrapper><Info>Please input data and submit! ^_^</Info></GridWrapper>;

    let { gridSize, outputObj: { creatures, zombies } } = data;
    const gridArr = Array(gridSize ** 2);
    for (let i = 0; i < gridSize ** 2; i++) {
        gridArr[i] = {
            index: i,
            x: i % gridSize,
            y: Math.floor(i / gridSize),
            obj: []
        }
    }

    creatures.forEach((creature) => {
        let gridIndex = gridArr.findIndex((grid) => grid.x === creature.x && grid.y === creature.y);
        gridArr[gridIndex].obj.push('creature');
    });

    zombies.forEach((creature) => {
        let gridIndex = gridArr.findIndex((grid) => grid.x === creature.x && grid.y === creature.y);
        gridArr[gridIndex].obj.push('zombie');
    });

    return (
        <GridWrapper>
            <Grid gridSize={gridSize}>{
                gridArr.map(grid => {
                    return (
                        <GridElement key={nanoid()}>
                            {
                                grid.obj.map((element) => {
                                    return <div key={nanoid()}>{element}</div>
                                })
                            }
                        </GridElement>
                    )
                })}
            </Grid>
        </GridWrapper>
    );
}

GridBox.propTypes = {
    resultData: PropTypes.shape({
        gridSize: PropTypes.number,
        outputObj: PropTypes.shape({
            creatures: PropTypes.arrayOf(PropTypes.object).isRequired,
            zombies: PropTypes.arrayOf(PropTypes.object).isRequired
        })
    })
}


export default GridBox;
import React , { useState } from 'react';

// material ui card
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  


const Scores = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [input, setInput] = useState({})
    // const [players, setPlayers] = useState(['shawn', 'austin', 'noah', 'raylah'])
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [currentRound, setCurrentRound] = useState(1)
    const [ scoreboard, setScoreboard ] = useState([
        {name: 'shawn', score: []},
        {name: 'austin', score: []},
        {name: 'noah', score: []},
        {name: 'raylah', score: []}
    ])
    const reducer = (accumulator, currentValue) => ({ points: accumulator.points + currentValue.points});

    const handleChange = e => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        let addNewScore = scoreboard[currentPlayer].score
        addNewScore.push({points: parseInt(input), round: currentRound, player: currentPlayer})
        // setScoreboard(...scoreboard, scoreboard[currentPlayer].score.concat({points: parseInt(input), round: currentRound, player: currentPlayer}))
        if (currentPlayer !== scoreboard.length-1)
        setCurrentPlayer(currentPlayer + 1)
        else {
            setCurrentPlayer(0)
            setCurrentRound(currentRound + 1)
        }
        setInput('')
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const reducerFunction = () => {
        if (scoreboard[currentPlayer].score.length > 0){
        //    return scoreboard[currentPlayer].score.reduce(reducer)
           return scoreboard[currentPlayer].score.reduce((a, b) => ({points: a.points + b.points})).points
        }
    }

    const changeScore = (player, round) => {
        setScoreboard([
            ...scoreboard,
            scoreboard[player][round].score.points
        ]) 
    }



    return (
        <>
        <div>
            <h3>hello</h3>
            <h3>Round: {currentRound}</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <h3>{scoreboard[currentPlayer].name}</h3>
            <input name={currentPlayer} value={input} onChange={handleChange} type="number"/>
        </form>

        <Card className={classes.root}>
        <CardHeader
            title={scoreboard[currentPlayer].name}
        />
        <CardContent>
        Total: {reducerFunction()}
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography paragraph>Scores:</Typography>
            <Typography paragraph>
                {scoreboard[currentPlayer].score.map(score => <p onClick={() => changeScore=(score.player, score.round)} key={`${score.player}-${score.round}`}>{score.points}</p>)}
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
        </>
    )
}

export default Scores;
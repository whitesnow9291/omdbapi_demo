import withStyles from '@material-ui/core/styles/withStyles';
import { default as React } from 'react';
import axios from 'axios';
import TextFormat from '@material-ui/icons/TextFormat';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomInput from 'components/CustomInput/CustomInput';
import Card from 'components/Card/Card';
import Assignment from '@material-ui/icons/Assignment';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown'
import CustomSelect from 'components/CustomSelect/CustomSelect'
import Switch from '@material-ui/core/Switch';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import Checkbox from '@material-ui/core/Checkbox';
import Check from '@material-ui/icons/Check'
import Badge from 'components/Badge/Badge'
import commonStyle from "./styles"
import { classes } from 'istanbul-lib-coverage';
const styles = {
    ...commonStyle,
    videoImage: {
        width: '100%'
    }
};
const api_url = process.env.REACT_APP_OMDB_API_URL;
const types = [{ label: 'All', value: '' }, { label: 'movie', value: 'movie' }, { label: 'series', value: 'series' }, { label: 'episode', value: 'episode' },]
const years = Array(100).fill(0).map((item, key) => ({ label: key + 1920, value: key + 1920 }))
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imdbId: this.props.match.params.imdbID,
            result: null,
            isLoading: false,
        }
    }
    componentDidMount() {
        this.onload()
    }
    setFilterOptions = (name, value) => {
        let filterOptions = this.state.filterOptions;
        filterOptions[name] = value
        this.setState({ filterOptions })
    }
    onload = () => {
        const { imdbId } = this.state
        let self = this;
        const url = api_url
        const params = {
            i: imdbId
        }
        this.setState({ isLoading: true })
        axios({
            url,
            method: 'get',
            params
        })
            .then(function (response) {
                console.log(response);

                self.setState({ isLoading: false })
                if (response.data.Response === "True") {
                    self.setState({
                        result: response.data
                    });
                } else {
                    alert(response.data.Error)
                }
            })
            .catch(function (errors) {
                console.info(errors);
                self.setState({ isLoading: false })
                alert('Undefined Error')
            });
    }
    renderVideo = () => {
        const { result, isLoading } = this.state;
        if (isLoading) return '...Loading'
        const video = result
        if (!video) return
        const { classes } = this.props
        return <GridContainer >
            <GridItem xs={12} sm={6}>
                {video.Poster !== 'N/A' && <img src={video.Poster} className={classes.videoImage} alt={'videoImg'} />}

            </GridItem>
            <GridItem xs={12} sm={6}>

                <h2>{video.Title}</h2>
                <p>{video.Year} &nbsp;<Badge color='info'>{video.Type}</Badge></p>
                <p>Released: {video.Year}</p>
                <p>Genre: {video.Released}</p>
                <p>Ratings: </p>
                <table className={classes.table}>
                    <thead>
                        <tr><th className={classes.td}>Source</th><th className={classes.td}>Value</th></tr>
                    </thead>
                    <tbody>
                        {video.Ratings.map((rate, key) => {
                            return <tr key={key}>
                                <td className={classes.td}>{rate.Source}</td>
                                <td className={classes.td}>{rate.Value}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </GridItem>
        </GridContainer>
    }
    render() {
        const { classes } = this.props;
        const { filterOptions, isLoading } = this.state

        return <div className={classes.container}>
            <div className={classes.main}>
                <Card>
                    <CardBody>
                        <Button color="success" onClick={()=>this.props.history.replace('/')}>Back</Button>
                        {this.renderVideo()}
                    </CardBody>
                </Card>
            </div>
        </div>;
    }
}
export default withStyles(styles, { withTheme: true })(Component)

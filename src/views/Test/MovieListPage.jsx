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
            filterOptions: {
                s: '',
                type: types[0],
                y: 2019
            },
            result: [],
            isLoading: false,
        }
    }
    componentDidMount() {
        const filterOptions = localStorage.getItem('filterOptions');
        if (filterOptions) {
            this.setState({
                filterOptions: JSON.parse(filterOptions)
            },()=>this.find())
        } else {

            this.setState({
                filterOptions: {
                    s: '',
                    type: types[0],
                    y: years[years.length - 1]
                }
            })
        }
    }
    setFilterOptions = (name, value) => {
        let filterOptions = this.state.filterOptions;
        filterOptions[name] = value
        this.setState({ filterOptions })
    }
    updateLocalStorage = () => {
        const { filterOptions } = this.state
        localStorage.setItem('filterOptions', JSON.stringify(filterOptions))
    }
    find = () => {
        const { filterOptions } = this.state
        if (filterOptions.s.trim().length === 0) { alert('Please enter title'); return }
        let self = this;
        const url = api_url
        const params = {
            s: filterOptions.s,
            y: filterOptions.y.value,
            type: filterOptions.type.value
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
                    self.updateLocalStorage()
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
        const videos = result.Search ? result.Search : []
        if (videos.length === 0) return <h5>Total: 0</h5>
        const videos_gridItem = videos.map((video, key) => {
            return <GridItem xs={12} sm={4} key={key} className={classes.pointer} onClick={() => this.props.history.push('/moviedetail-page/' + video.imdbID)}>
                {video.Poster !== 'N/A' && <img src={video.Poster} className={classes.videoImage} alt={'videoImg' + key} />}
                <h5><b>{video.Title}</b></h5>
                <p>{video.Year} &nbsp;<Badge color='info'>{video.Type}</Badge></p>
            </GridItem>
        })
        return <div>
            <h5>Total: {result.totalResults}</h5>
            <GridContainer>
                {videos_gridItem}
            </GridContainer>
        </div>
    }
    render() {
        const { classes } = this.props;
        const { filterOptions, isLoading } = this.state

        return <div className={classes.container}>
            <div className={classes.main}>
                <h2>Movie List</h2>
                <Card>
                    <CardBody>
                        <GridContainer className={classes.flexEnd}>
                            <GridItem xs={12} md={3}>

                                <CustomInput
                                    formControlProps={{
                                        onChange: (e) => this.setFilterOptions('s', e.target.value),
                                        className: classes.noPadding + ' ' + classes.noMargin
                                    }}
                                    inputProps={{
                                        placeholder: 'Search Title',
                                        value: filterOptions.s
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} md={3}>
                                <div>
                                    <div><b>Type:</b></div>
                                    <CustomSelect
                                        onChange={(data) => this.setFilterOptions('type', data)}
                                        value={filterOptions.type}
                                        isMulti={false}
                                        options={types}
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={12} md={3}>
                                <div>
                                    <div><b>Year:</b></div>

                                    <CustomSelect
                                        onChange={(data) => this.setFilterOptions('y', data)}
                                        isMulti={false}
                                        options={years}
                                        value={filterOptions.y}
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={12} md={3}>
                                <Button className={classes.noMargin} color="info" onClick={() => this.find()}>Find</Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h3>Search Result</h3>
                        {this.renderVideo()}
                    </CardBody>
                </Card>
            </div>
        </div>;
    }
}
export default withStyles(styles, { withTheme: true })(Component)

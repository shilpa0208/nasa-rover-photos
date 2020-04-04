import React, { useState, useEffect } from 'react'
import List from './List'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import * as ActionCreators from './store/actions/actions'


const DEFAULT_SOL = 2000

/**
 * react-inifinite-scroll-component third party library has been used to bring in the infinite scrolling 
 * functionality which was simpler than re-writing a similar logic that would achieved the same objective
 * in this short span of time
 */
const App = (props) => {

    // local state defaults
    const [activePhoto, setActivePhoto] = useState(null)
    const [sol, setSol] = useState(DEFAULT_SOL)

    useEffect(() => {
        props.fetchData(sol, props.currentPage)
    }, [])
 
    const solChangeHandler = (event) => {
        const re = /[0-9]+/g;
        if (!re.test(event.key)) {
            event.preventDefault()
        }

        setSol(event.target.value)
    }

    const centerStyle = {textAlign: 'center'}
    const noPhotos = <div style={centerStyle} >No Photos found!</div>
    const invalidSol = <div style={centerStyle}>No Photos found. Enter a valid sol</div>
    const loader = <div style={centerStyle} key={props.currentPage}>Loading ...</div>

    return (
        <div>

            {/**Add ability to change sol, and UI if sol out of range 
             * The UI takes care of negative bounds, allows increments by 1 
            */}
            <div style={{ marginBottom: 10, textAlign: 'center' }}>
                <h4>Sol Lookup Functionality</h4>
                <label htmlFor='sol'>Sol: </label>
                <input type='number' id='sol' placeholder={DEFAULT_SOL} name='sol' min='0' val={sol} onChange={solChangeHandler}/>
                <button type='button' onClick={() => props.fetchDataBySol(sol)}>Get Photos</button>
            </div>
            
            {/**
             * Takes care of invalid Sol values and when No Photos are found(if backend is down maybe)
             */}
            {sol !== DEFAULT_SOL && !props.photos.length && invalidSol}
            {sol === DEFAULT_SOL && !props.photos.length && noPhotos}
            
            <div id='scrollable-area' style={{ height: 400, overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={props.photos.length}
                    next={() => props.fetchData(sol, props.currentPage)}
                    hasMore={props.hasMoreItems}
                    loader={loader}
                    height={400}
                    scrollableTarget='scrollable-area'
                    scrollThreshold={0.9}
                >
                    <List items={props.photos} setActivePhotoHandler={(item) => setActivePhoto(item)} />
                </InfiniteScroll>
            </div>
            
            <hr />

             {/**
              * Displays the current active photo and remains active even when multiple page loads
              */}
            <div style={{textAlign: 'center'}}>
                <h4>Active Photo </h4>
                {activePhoto &&
                    <div style={{ display: 'block', height: 400, overflow: 'auto' }}>
                        <img src={activePhoto.img_src} alt={activePhoto.id} />
                    </div>}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        photos: state.photos,
        activePhoto: state.activePhoto,
        currentPage: state.currentPage,
        hasMoreItems: state.hasMoreItems,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataBySol: (sol) => dispatch(ActionCreators.fetchDataBySol(sol)),
        fetchData: (sol, currentPage) => dispatch(ActionCreators.fetchData(sol, currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

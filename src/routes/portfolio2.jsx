/*
Only load tab that is selected.

    const [tab, setTab] = useState(1);
    const [top, setTop] = useState(false);
    const [picIdx, setPicIdx] = useState(-1);
    const [active, setActive] = useState(false);
    
    const [navScroll, setNavScroll] = useState(0);
    const [caption, setCaption] = useState('');


    1. const [preloaded, setPreloaded] = useState()
    2. in a useEffect, create an array of promises that resolve with each image url loads. after promise.all(promises) is true, setPreloaded(loadedimages)
        a. could modify the dependency array to run when tab changes. choose which images to load based on tab.

    3. in the return, run a map on preloaded.
*/

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import ScrollDown from '../components/scrolldown.jsx'
import PortfolioViewer from '../components/portfolioviewer.jsx'
import Footer from '../components/footer.jsx';

function Portfolio() {

    const [tab, setTab] = useState(1);
    const [top, setTop] = useState(false);
    const [picIdx, setPicIdx] = useState(-1);
    const [active, setActive] = useState(false);
    
    const [navScroll, setNavScroll] = useState(0);
    const [caption, setCaption] = useState('');

    const [total, setTotal] = useState(photos[1].length);

    const [preloaded, setPreloaded] = useState([]);

    const photos = [
        [
            { id: 0, caption: "Milky Way captured near Wenatchee, Washington State. 5/28/2023", loaded: false, src: "DSC08158-Pano-2_znuvbc"},
            { id: 1, caption: "Male Ruby-throated Hummingbird near Seattle, Washington. 6/15/2021", loaded: false, src: "1_turnee"},
            { id: 2, caption: "Haymarket Pedestrian Bridge near Pinnacle Bank Arena in Lincoln, Nebraska. 3/2/2022", loaded: false, src: "2_hxevjr"},
            { id: 3, caption: "House Finch in downtown Los Angeles. 5/14/2022", loaded: false, src: "6_y8fi6x"},
            { id: 4, caption: "Evening landscape of the sandhills near Valentine, Nebraska. 5/24/2021", loaded: false, src: "7_h0hkfn"},
        ]
        ,
        [
            { id: 0, caption: "Michigan vs Central Michigan Baseball. 3/28/2023", loaded: false},
            { id: 1, caption: "Michigan vs Ohio State Lacrosse. 4/21/2023", loaded: false},
            { id: 2, caption: "Santa Ono and others pose for the groundbreaking of a new Unviersity of Michigan dorm. 10/13/2023", loaded: false},
            { id: 3, caption: "An evening with Governor Gretchen Whitmer and CNN Anchor Chris Wallace. 3/8/2023", loaded: false},
            { id: 4, caption: "Michigan vs Ohio State Lacrosse. 4/21/2023", loaded: false},
            { id: 5, caption: "J.J. McCarthy celebrates a win against Nebraska with fans. 9/30/2023", loaded: false},
            { id: 6, caption: "Nebraska ACLU organized protest against the historic overturning of Roe v. Wade. 6/24/2022", loaded: false},
            { id: 7, caption: "Kalel Mullings beats the pack to score against Nebraska. 9/30/2023", loaded: false},
            { id: 8, caption: "Michigan vs Central Michigan Baseball. 3/28/2023", loaded: false},
            { id: 9, caption: "It's TAPpening show hosted by the RhythM Tap Ensemble. 1/21/2023", loaded: false},
            { id: 10, caption: "Jim Duree wearing his Trump Anti-War Candidate sign. 6/25/2023", loaded: false},
            { id: 11, caption: "Donald Trump speaks at the Lincoln Day Dinner in Novi, Michigan. 6/25/2023", loaded: false},
            { id: 12, caption: "Ann Arbor resident Jeremy Fiori performs through the reverberant acoustics of Graffiti Alley. 7/9/2023", loaded: false},
            { id: 13, caption: "Engaged concertgoers groove together at the annual Ann Arbor Summer Fest Saturday evening. 6/10/2023", loaded: false},
            { id: 14, caption: "Fourth of July celebration at The Big House. 7/4/2023", loaded: false}
        ]
        ,
        [
            { id: 0, caption: "Unknown at the University of Michigan League. 4/7/2023", loaded: false, src: "0_dpfu5n"},
            { id: 1, caption: "Lee Bowes & the Jupiter Rings performing at Checkerfest. 7/11/2021", loaded: false, src: "1_lxueco"},
            { id: 2, caption: "Professional headshot taken at the Ross School of Business. 4/08/2023", loaded: false, src: "2_nsbjye"},
            { id: 3, caption: "A grandmother and granddaughter strolling near Kirkland, Washington. 4/29/2023", loaded: false, src: "3_ptz9g0"},
            { id: 4, caption: "Portrait taken in downtown Lincoln Nebraska. 6/3/2022", loaded: false, src: "5_be3aus"},
            { id: 5, caption: "Paddle exchange at the Kappa Phi Lambda sorority -- Phi chapter banquet. 4/15/2023", loaded: false, src: "6_ssuefa"},
            { id: 6, caption: "Mother & daughter near Waikiki Beach, Honolulu. 2/26/2023", loaded: false, src: "7_a6lzsf"},
            { id: 7, caption: "Checkerfest promotion. 7/8/2021", loaded: false, src: "9_iy1q5f"},
            { id: 8, caption: "U of M football players pose for a picture at Winterfest, 2/17/2024", loaded: false, src: "DSC06577-2_a84ora"}
        ]
    ]

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const preloadImages = () => {
            const promises = photos[tab].map((obj) => {
                return new Promise((resolve, reject) => {
                    const img = new image();
                    img.onload = () => resolve(img);
                    img.onerror = (error) => reject(error);
                    img.src = obj.id;
                })
            })

            Promise.all(promises)
            .then((loaded) => {
                setPreloaded(loaded);
            })
            .catch((error) => {
                console.error("error", error);
            })
        }

        preloadImages();

    }, [tab])

    const handleNavClick = (tab) => {
        setTab(tab);
        setTotal(photos[tab].length);
    }

    const handleImgClick = (img) => {
        setPicIdx(img.id);
        setCaption(img.caption)
        setActive(true);
    }

    const handleModalChange = () => {
        setActive((prev) => !prev);
    }

    const handleLoad = (idx) => {
        // set this image to loaded
        // for each image in tab, check if those are loaded
        setLoaded((prev) => {
            prev[tab][idx].loaded = true
            return prev;
            // console.log(prev[tab][idx].loaded)
        });

        // console.log(loaded)

        loaded[tab].forEach((obj) => {
            if(!obj.loaded) {
                setAllLoaded(false);
                return;
            }
        })
        setAllLoaded(true);
        console.log(loaded, allLoaded)
    }

    const handleScroll = (e) => {
        if(window.pageYOffset === 0) {
            setTop(true)
          } else {
              setTop(false);
        }
        setNavScroll(window.pageYOffset / 2);
    }

    return (
        <>
            <div>
                <ul id="portfolio-nav" style={{transform: `translateY(${navScroll}px)`}}>
                    <li className={tab == 0 ? "active": "none"} onClick={() => {handleNavClick(0)}}>Landscapes & Nature</li>
                    <li className={tab == 1 ? "active": "none"} onClick={() => {handleNavClick(1)}}>The Michigan Daily</li>
                    <li className={tab == 2 ? "active": "none"} onClick={() => {handleNavClick(2)}}>Portraits & People</li>
                </ul>
            </div>
            <div className="grid-container">

            {photos[tab].map((image) => {
                <div key={image.id} className="grid-item"  onClick={() => {handleImgClick(image)}}>
                    <img className={`portfolio-img loaded`} src={`images/portfolio/daily}/` + image.id + `.jpg`}/>
                </div>
            })}

            </div>
            <Footer/>
            <ScrollDown active={top}/>
            {active && <PortfolioViewer series={tab} img={picIdx} total={total} handleChange={handleModalChange} caption={caption} photos={photos}/>}
        </>
    );
}

export default Portfolio;
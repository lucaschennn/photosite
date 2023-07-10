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
    const [loaded, setLoaded] = useState(false);
    const [navScroll, setNavScroll] = useState(0);
    const [caption, setCaption] = useState('');

    const photos = [
        [
            { id: 0, caption: "Milky Way captured near Wenatchee, Washington State. 5/28/2023",},
            { id: 1, caption: "Male Ruby-throated Hummingbird near Seattle, Washington. 6/15/2021",},
            { id: 2, caption: "Haymarket Pedestrian Bridge near Pinnacle Bank Arena in Lincoln, Nebraska. 3/2/2022",},
            { id: 3, caption: "Starscape captured at Vedauwoo near Laramie, Wyoming. 8/16/2022",},
            { id: 4, caption: "Two tree swallows near Pioneer's Park in Lincoln, Nebraska. 5/6/2022",},
            { id: 5, caption: "Tree Sparrow at Kensington Metropark, Michigan. 1/8/2023",},
            { id: 6, caption: "House Finch in downtown Los Angeles. 5/14/2022",},
            { id: 7, caption: "Evening landscape of the sandhills near Valentine, Nebraska. 5/24/2021",},
            { id: 8, caption: "Cardinal on University of Nebraska-Lincoln East Campus. 10/15/2022",},
        ]
        ,
        [
            { id: 0, caption: "Michigan vs Central Michigan Baseball. 3/28/2023",},
            { id: 1, caption: "Michigan vs Ohio State Lacrosse. 4/21/2023",},
            { id: 2, caption: "An evening with Governor Gretchen Whitmer and CNN Anchor Chris Wallace. 3/8/2023",},
            { id: 3, caption: "An evening with Governor Gretchen Whitmer and CNN Anchor Chris Wallace. 3/8/2023",},
            { id: 4, caption: "Michigan vs Ohio State Lacrosse. 4/21/2023",},
            { id: 5, caption: "An evening with Governor Gretchen Whitmer and CNN Anchor Chris Wallace. 3/8/2023",},
            { id: 6, caption: "Nebraska ACLU organized protest against the historic overturning of Roe v. Wade. 6/24/2022",},
            { id: 7, caption: "Nebraska ACLU organized protest against the historic overturning of Roe v. Wade. 6/24/2022",},
            { id: 8, caption: "Michigan vs Central Michigan Baseball. 3/28/2023",},
            { id: 9, caption: "It's TAPpening show hosted by the RhythM Tap Ensemble. 1/21/2023",},
            { id: 10, caption: "Jim Duree wearing his Trump Anti-War Candidate sign. 6/25/2023"},
            { id: 11, caption: "Donald Trump speaks at the Lincoln Day Dinner in Novi, Michigan. 6/25/2023"}
        ]
        ,
        [
            { id: 0, caption: "Unknown at the University of Michigan League. 85mm lens borrowed from Caleb Mastell. 4/7/2023",},
            { id: 1, caption: "Lee Bowes & the Jupiter Rings performing at Checkerfest. 7/11/2021",},
            { id: 2, caption: "Headshot at the Ross School of Business. 4/8/2023",},
            { id: 3, caption: "A grandmother and granddaughter strolling near Kirkland, Washington. 4/29/2023",},
            { id: 4, caption: "Portrait taken near Pioneer's Park in Lincoln Nebraska. 6/1/2022",},
            { id: 5, caption: "Portrait taken in downtown Lincoln Nebraska. 6/3/2022",},
            { id: 6, caption: "Headshot at the University of Michigan Law quad. 4/8/2023",},
            { id: 7, caption: "Paddle exchange at the Kappa Phi Lambda sorority -- Phi chapter banquet. 4/15/2023",},
            { id: 8, caption: "Mother & daughter near Waikiki Beach, Honolulu. 2/26/2023",},
            { id: 9, caption: "USC Marshall School of Business Graduation. 5/13/2022",},
            { id: 10, caption: "Portrait taken near Pioneer's Park in Lincoln Nebraska. 6/1/2022",},
            { id: 11, caption: "USC Marshall School of Business Graduation. 5/13/2022",},
            { id: 12, caption: "Checkerfest promotion. 7/8/2021",},
        ]
    ]
    const [total, setTotal] = useState(photos[1].length);
    const contentRef = useRef(null);

    useEffect(() => {

        window.onscroll = function() {

            if(window.pageYOffset === 0) {
              setTop(true)
            } else {
                setTop(false);
            }
          };
    })

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (tab) => {
        setTab(tab);
        setTotal(photos[tab].length);
    }

    const handleImgClick = (idx) => {
        setPicIdx(idx);
        setCaption(photos[tab][idx].caption)
        setActive(true);
    }

    const handleModalChange = () => {
        setActive((prev) => !prev);
    }

    const handleLoad = () => {
        setLoaded(true);
    }

    const handleScroll = (e) => {
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
            {tab === 0 && photos[0].map((image) => (
                <div key={image.id} className="grid-item"  onClick={() => {handleImgClick(image.id)}}>
                    <img className={`portfolio-img ${loaded ? 'loaded' : ''}`} src={`images/portfolio/landscapes/` + image.id + `.jpg`} onLoad={handleLoad}/>
                </div>
            ))}
            {tab === 1 && photos[1].map((image) => (
                <div key={image.id} className="grid-item"  onClick={() => {handleImgClick(image.id)}}>
                    <img className={`portfolio-img ${loaded ? 'loaded' : ''}`} src={`images/portfolio/daily/` + image.id + `.jpg`} onLoad={handleLoad}/>
                </div>
            ))}
            {tab === 2 && photos[2].map((image) => (
                <div key={image.id} className="grid-item"  onClick={() => {handleImgClick(image.id)}}>
                    <img className={`portfolio-img ${loaded ? 'loaded' : ''}`} src={`images/portfolio/portraits/` + image.id + `.jpg`} onLoad={handleLoad}/>
                </div>
            ))}
            </div>
            <Footer/>
            <ScrollDown active={top}/>
            {active && <PortfolioViewer series={tab} img={picIdx} total={total} handleChange={handleModalChange} caption={caption} photos={photos}/>}
        </>
    );
}

export default Portfolio;
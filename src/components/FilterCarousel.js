import React, { useState , useRef} from 'react';

const FilterCarousel = ({isVisible}) => {
    const [activeButtons, setActiveButtons] = useState([]);
    const carouselRef = useRef(null);

    const categories = [
        'Art', 'Books', 'Business', 'Comedy',
        'Education', 'Entertainment', 'Fashion',
        'Food', 'Gaming', 'Health', 'History',
        'Home', 'How-to', 'Music',
        'News', 'Politics', 'Science',
        'Sports', 'Tech', 'Travel'];

const handleButtonClick = (index) => {
    const updatedActiveButtons = activeButtons.includes(index)
        ? activeButtons.filter(item => item !== index)
        : [...activeButtons, index];
    setActiveButtons(updatedActiveButtons);
};

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    return (
        <div style={{
            display: isVisible ? 'flex' : 'none',
            alignItems: 'center',
            height: '50px',
            position: 'relative', // Added for positioning arrow buttons
            overflow: 'hidden',
        }} aria-label="Filter options" role="navigation">
            <button onClick={scrollLeft}  style={{
                display: 'flex',
                boxShadow: 'grey 0px 2px 5px 0px',
                justifyContent: 'center',
                borderRadius: '20px',
                marginRight: '20px',
                padding: '4px',
                zIndex: 1,
                cursor: 'pointer',
                background: 'white',
                border: 'none',
            }}>
                <img src={'https://cdn-icons-png.flaticon.com/512/56/56814.png'} style={{
                    height: '30px',
                    transform: 'rotate(180deg)',
                }}/>
            </button>
            <ul ref={carouselRef} style={{
                display: 'flex',
                listStyleType: 'none',
                overflowX: 'auto',
                maxWidth: '525px',
                padding: 0,
                margin: 0,
                alignItems: 'center',
            }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <li title={'Botton '+ (i)} key={i} style={{
                        cursor: 'pointer',
                        marginRight: '5px',
                        backgroundColor: activeButtons.includes(i) ? 'lightpink' : '#dedede',
                        borderRadius: '50px',
                        fontSize: '1.2rem',
                        minWidth: '100px',
                        height: '35px',
                        flexShrink: 0,
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none'
                    }}
                        onClick={() => handleButtonClick(i)}
                        tabIndex={0}
                        aria-pressed={activeButtons.includes(i)}
                        role="button"
                    >
                        {categories[i]}
                    </li>
                ))}
            </ul>
            <button onClick={scrollRight} style={{
                boxShadow: 'grey 0px 2px 5px 0px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                marginLeft: '20px',
                zIndex: 1,
                padding: '4px',
                cursor: 'pointer',
                background: 'white',
                border: 'none',
            }}>
                <img  src={'https://cdn-icons-png.flaticon.com/512/56/56814.png'} style={{
                    height: '30px',
                }}  />
            </button>
        </div>
    );
};

export default FilterCarousel;

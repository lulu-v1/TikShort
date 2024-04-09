import ScrollSnapping from "../scripts/ScrollSnapping";

const AdvancedCarousel = () => {
    return (
        <div style={{ overflow: 'hidden'}}>
            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {Array.from({ length: 100 }).map((_, i) => (
                    <li
                        key={i} // Add key prop for optimization
                        style={{
                            backgroundColor: 'red',
                            borderRadius: '10px',
                            fontSize: '50px',
                            width: '22vw',
                            height: '830px',
                            marginTop: '20px',
                            flexShrink: 0,
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        Item {i}
                    </li>
                ))}
            </ul>
            <ScrollSnapping />
        </div>
    );
};

export default AdvancedCarousel;

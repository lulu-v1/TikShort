// import logo from 'public/logo192.png';

function Header() {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            backgroundColor: 'black',
            color: 'white',
            height: '80px',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '10px'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    width: '20vw',
                }}>TikShort
                </h1>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                }}>
                    <input type="text" placeholder="Search..." style={{
                        width: '25vw',
                        height: '21px',
                        padding: '5px',
                        borderRadius: '15px',
                        border: 'none'
                    }}/>
                    <button style={{
                        padding: '5px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: 'white',
                        color: 'black'
                    }}>apply
                    </button>
                </div>
                <form action="/">
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        gap: '18px'
                    }}>
                        <li>
                            <button style={{
                                transition: '0.5s esae',
                                height: '30px',
                                padding: '5px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: "lightsteelblue",
                                color: 'black',
                            ':hover': { // Aplicando estilo al hover
                                    cursor: 'pointe',
                                    opacity: '1',
                                }
                            }}>Category 1</button>
                        </li>
                        <li>
                            <button style={{
                                height: '30px',
                                padding: '5px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'lightpink',
                                color: 'black'
                            }}>Category 2</button>
                        </li>
                        <li>
                            <button style={{
                                height: '30px',
                                padding: '5px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'lightgreen',
                                color: 'black'
                            }}>Category 3</button>
                        </li>
                    </ul>
                </form>
            </nav>
        </header>
    );
}

export default Header;

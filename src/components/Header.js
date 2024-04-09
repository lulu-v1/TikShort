// import logo from 'public/logo192.png';

function Header() {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            fontSize: '20px',
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            maxHeight: '10vh'
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px'
            }}>
                <h1>TikShort</h1>
                <div style={{
                    padding: '10px',
                    display: 'flex',
                    gap: '5px',
                }}>
                    <input type="text" placeholder="Search..." style={{
                        padding: '5px',
                        borderRadius: '5px',
                        border: 'none'
                    }}/>
                    <button style={{
                        padding: '5px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: 'white',
                        color: 'black'
                    }}>apply
                    </button>
                </div>
                <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    gap: '5px'
                }}>
                    <div>
                    </div>
                </ul>
                <form action="/">
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <li>
                            <button>Category 1</button>
                        </li>
                        <li>
                            <button>Category 2</button>
                        </li>
                        <li>
                            <button>Category 3</button>
                        </li>
                    </ul>
                </form>
            </nav>
        </header>
    );
}

export default Header;

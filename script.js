class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state here (only once!)
        this.state = {
            portfolio: [
                {
                    name: 'Feetbook',
                    shares_owned: 20,
                    cost_per_share: 50,
                    market_price: 130
                },
                {
                    name: 'Yamazon',
                    shares_owned: 5,
                    cost_per_share: 200,
                    market_price: 500
                },
                {
                    name: 'Snoozechat',
                    shares_owned: 100,
                    cost_per_share: 20,
                    market_price: 3
                }
            ]
        };
    }

    render() {
        const { portfolio } = this.state;

        return (
            <div className="container">
                <h1 className="text-center my-4">Stock Portfolio</h1>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Shares Owned</th>
                                    <th scope="col">Cost per share ($)</th>
                                    <th scope="col">Market Price ($)</th>
                                    <th scope="col">Market Value ($)</th>
                                    <th scope="col">Unrealized Gain/Loss ($)</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolio.map((stock, index) => {
                                    const {
                                        name,
                                        shares_owned,
                                        cost_per_share,
                                        market_price
                                    } = stock;

                                    // Calculate derived values
                                    const market_value = shares_owned * market_price;
                                    const cost_value = shares_owned * cost_per_share;
                                    const unrealized_gain = market_value - cost_value;

                                    return (
                                        <tr key={index}>
                                            <td>{name}</td>
                                            <td>
                                                <input type="number" name="shares_owned" value={shares_owned} readOnly />
                                            </td>
                                            <td>
                                                <input type="number" name="cost_per_share" value={cost_per_share} readOnly />
                                            </td>
                                            <td>
                                                <input type="number" name="market_price" value={market_price} readOnly />
                                            </td>
                                            <td>${market_value.toFixed(2)}</td>
                                            <td
                                                style={{ color: unrealized_gain >= 0 ? 'green' : 'red' }}
                                            >
                                                ${unrealized_gain.toFixed(2)}
                                            </td>
                                            <td>
                                                <button className="btn btn-light btn-sm">remove</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

// Render the Portfolio component into the page
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Portfolio />);

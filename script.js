class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolio: [
                {
                    name: 'Feetbook',
                    shares_owned: 20,
                    cost_per_share: 50,
                    market_price: 130,
                },
                {
                    name: 'Yamazon',
                    shares_owned: 5,
                    cost_per_share: 200,
                    market_price: 500,
                },
                {
                    name: 'Snoozechat',
                    shares_owned: 100,
                    cost_per_share: 20,
                    market_price: 3,
                },
            ],
            form: {
                name: '',
                shares_owned: 0,
                cost_per_share: 0,
                market_price: 0,
            },
        };

        // Binding methods
        this.handleChange = this.handleChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.removeStock = this.removeStock.bind(this);
        this.addStock = this.addStock.bind(this);
    }

    handleChange(event, index) {
        const portfolio = [...this.state.portfolio]; // shallow copy
        const { name, value } = event.target;

        // Update stock at index with parsed number
        portfolio[index][name] =
            name === 'name' ? value : parseFloat(value) || 0;

        this.setState({ portfolio });
    }

    handleFormChange(event) {
        const { name, value } = event.target;
        const form = { ...this.state.form };

        form[name] = name === 'name' ? value : parseFloat(value) || 0;
        this.setState({ form });
    }

    addStock(event) {
        event.preventDefault();
        const portfolio = [...this.state.portfolio, this.state.form];

        this.setState({
            portfolio,
            form: {
                name: '',
                shares_owned: 0,
                cost_per_share: 0,
                market_price: 0,
            },
        });
    }

    removeStock(index) {
        const portfolio = [...this.state.portfolio];
        portfolio.splice(index, 1);
        this.setState({ portfolio });
    }

    render() {
        const { portfolio, form } = this.state;

        const portfolio_market_value = portfolio.reduce(
            (sum, stock) => sum + stock.shares_owned * stock.market_price,
            0
        );
        const portfolio_cost = portfolio.reduce(
            (sum, stock) => sum + stock.shares_owned * stock.cost_per_share,
            0
        );
        const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

        return (
            <div className="container">
                <h1 className="text-center my-4">Stock Portfolio</h1>

                <div className="row">
                    {/* Add Stock Form */}
                    <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
                        <input
                            className="mx-2"
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={this.handleFormChange}
                            value={form.name}
                            required
                        />
                        <input
                            className="mx-2"
                            name="shares_owned"
                            type="number"
                            placeholder="Shares"
                            value={form.shares_owned}
                            onChange={this.handleFormChange}
                        />
                        <input
                            className="mx-2"
                            name="cost_per_share"
                            type="number"
                            placeholder="Cost"
                            value={form.cost_per_share}
                            onChange={this.handleFormChange}
                        />
                        <input
                            className="mx-2"
                            name="market_price"
                            type="number"
                            placeholder="Price"
                            value={form.market_price}
                            onChange={this.handleFormChange}
                        />
                        <button className="btn btn-primary btn-sm">add</button>
                    </form>

                    {/* Portfolio Table */}
                    <div className="col-12">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Shares Owned</th>
                                    <th>Cost per share ($)</th>
                                    <th>Market Price ($)</th>
                                    <th>Market Value ($)</th>
                                    <th>Unrealized Gain/Loss ($)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolio.map((stock, index) => {
                                    const {
                                        name,
                                        shares_owned,
                                        cost_per_share,
                                        market_price,
                                    } = stock;

                                    const market_value = shares_owned * market_price;
                                    const unrealized_gain_loss =
                                        market_value - shares_owned * cost_per_share;

                                    return (
                                        <tr key={index}>
                                            <td>{name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="shares_owned"
                                                    value={shares_owned}
                                                    onChange={(e) => this.handleChange(e, index)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="cost_per_share"
                                                    value={cost_per_share}
                                                    onChange={(e) => this.handleChange(e, index)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="market_price"
                                                    value={market_price}
                                                    onChange={(e) => this.handleChange(e, index)}
                                                />
                                            </td>
                                            <td>${market_value.toFixed(2)}</td>
                                            <td
                                                style={{
                                                    color: unrealized_gain_loss >= 0 ? 'green' : 'red',
                                                }}
                                            >
                                                ${unrealized_gain_loss.toFixed(2)}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-light btn-sm"
                                                    onClick={() => this.removeStock(index)}
                                                >
                                                    remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="4" className="text-end">
                                        Totals:
                                    </th>
                                    <th>${portfolio_market_value.toFixed(2)}</th>
                                    <th
                                        style={{
                                            color: portfolio_gain_loss >= 0 ? 'green' : 'red',
                                        }}
                                    >
                                        ${portfolio_gain_loss.toFixed(2)}
                                    </th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Totals Display */}
                    <div className="col-12 col-md-6">
                        <h4 className="mb-3">
                            Portfolio value: ${portfolio_market_value.toFixed(2)}
                        </h4>
                    </div>
                    <div className="col-12 col-md-6">
                        <h4 className="mb-3">
                            Portfolio gain/loss: ${portfolio_gain_loss.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

// Mount the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Portfolio />);

import * as React from 'react';

type State = {
	response: {}
	error: boolean
}

type Props = {
	url: string
	options?: {}
	loading: boolean
}
class Loading extends React.Component<Props, State> {
	state : State = {
		response: {},
		error: false
	}
	callAPI = () => {
		const { url, options } = this.props;
		fetch(url, options)
			.then(
				response => {
					if (response.status !== 200) {
						this.setState({
							response: `There was a problem, status code ${response.status}`
						});
						return;
					}
					response.json().then(
						data => this.setState({
							response: data
						})
					);
				}
			)
			.catch(
				err => this.setState({error: true, response: err})
			)
	}
  render() {
		const { loading } = this.props;
    return (
			<div>
				{loading ?
					<span>Loading...</span>
					:
					<button>Load More</button>
				}
			</div>
    );
  }
}

export default Loading;
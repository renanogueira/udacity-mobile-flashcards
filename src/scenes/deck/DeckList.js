import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Constants } from "expo";

import { fetchDecks } from "../../actions";
import DeckListItem from "../../components/DeckListItem";

class DeckList extends PureComponent {
	componentDidMount() {
		this.props.getDecks();
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<View style={{ paddingTop: Constants.statusBarHeight }}>
				<FlatList
					data={this.props.decks}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<DeckListItem navigation={navigation} item={item} />
					)}
					style={{ paddingBottom: 20 }}
				/>
			</View>
		);
	}
}

function mapStateToProps(data) {
	return {
		decks: Object.keys(data).reduce((decks, id) => {
			return decks.concat(data[id]);
		}, [])
	};
}

function mapDispatchToProps(dispatch) {
	return { getDecks: () => dispatch(fetchDecks()) };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList);

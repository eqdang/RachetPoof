import { connect } from "react-redux";
import Navbar from "./navbar";
import { logout } from "../../actions/session_actions";

// const mapStateToProps = state => ({
//   currentUser: state.entitites.users[state.session.id],
// });

// const mapStateToProps = ({ session }) => ({
//   currentUser: session.currentUser
// });

const mapStateToProps = ({ session, entities: { users } }) => {
	return {
		currentUser: users[session.id]
	};
};

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
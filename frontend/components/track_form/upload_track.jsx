import React from "react";
// import UploadTrackForm from "./upload_track_form";

// import { connect } from "react-redux";
// import NavBarContainer from "../navbar/navbar_container";
// import { openModal } from "../../actions/modal_actions";
import {withRouter} from "react-router";
// import { createTrack } from "../../actions/track_actions";
// import Modal from "react-modal";

class UploadTrack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploader_id: this.props.uploader_id,
			title: "",
			trackFile: null,
			errors: []
			// artist: "", artworkUrl: "", artworkFile: null, trackUrl: "", trackFile: "", route: "upload", isActive: "", formPage: "prompt page",
		};
		// this.back = this.back.bind(this);
		// this.toHome = this.toHome.bind(this);
		this.handleTrackFile = this.handleTrackFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTrackFile(e) {
		e.preventDefault();
		const trackFile = e.currentTarget.files[0];
		// const fileReader = new FileReader();
		if (trackFile.type === "audio/mp3") {
			this.setState({
				trackFile: trackFile,
				trackUrl: fileReader.result,
				title: this.titleize(trackFile.name.split(".")[0].split("-")),
				errors: []
			});
		} else {
			this.setState({
				errors: [
					"1 of your files is not supported. Read about our supported file types."
				]
			});
		}
		// if (file) {
		// 	fileReader.readAsDataURL(file);
		// }
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		// this.props.processForm(user);
		this.props.processForm(user).then(this.props.closeModal);
	}

	render() {
		// <div classsName="">
		if (this.state.trackFile) {
			return (
				<UploadTrackForm
				// title={this.state.title}
				// trackFile={this.state.trackFile}
				// userId={this.state.userId}
				// createTrack={this.props.createTrack}
				/>
			);
		} else {
			return (
				<div
					className="upload-form-container"
					onDrop={this.dropHandler}
					onDragOver={this.dragOverHandler}
				>
					<h1>Drag and drop your tracks & albums here</h1>

					<form className="upload-form-content" onSubmit={this.handleSubmit}>
						<label className="custom-file-upload">
							or choose files to upload
							<input type="file" onChange={this.handleTrackFile} />
						</label>

						<div className="privacy-radio-inputs">
							<p>Privacy:</p>
							<label>
								<input
									type="radio"
									name="privacy"
									value="Public"
									defaultChecked
									onClick={this.updateRadioInput}
								/>
								Public
							</label>
							<label>
								<input
									type="radio"
									name="privacy"
									value="Private"
									onClick={this.updateRadioInput}
								/>
								Private
							</label>
						</div>

						<input type="submit" value={this.props.formType} className="session-submit" />
						{/* <button type="submit" className="signup-button">
							Upload
						</button> */}
					</form>

					<p>
						Provide FLAC, WAV, ALAC or AIFF for best audio quality.{" "}
						<a
							href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile"
							target="_blank"
						>
							Learn more about high quality audio (HQ).
						</a>
					</p>
				</div>
			);
		}
	}
};

export default withRouter(UploadTrack);

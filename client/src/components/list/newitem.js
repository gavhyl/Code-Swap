import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { createPost } from "../../actions/index";
import { Link } from "react-router";

class NewItem extends Component {
	handleFormSubmit(formProps) {
		this.props.createPost(formProps);
	}

	render() {
		const { handleSubmit, fields: { title, category, url, content }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="col-md-4">
				<h3>Create a New Post</h3>
				<fieldset className="form-group">
					<label>Title: </label>
					<input {...title} type="text" className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Category: </label>
					<input {...category} type="text" className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>URL: </label>
					<input {...url} type="text" className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Content: </label>
					<textarea {...content} type="text" className="form-control text" rows="5" />
				</fieldset>
				<div>
					<Link to="/" className="col-md-3 btn btn-danger">Cancel</Link>
					<Link to="/items" className="col-md-3 col-md-offset-1 btn btn-info text-center">Post List</Link>
					<button action="submit" className="col-md-3 col-md-offset-1 btn btn-primary">Submit</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "ListNewItem",
	fields: ["title", "category", "url", "content"]
}, null, { createPost })(NewItem);
// null is for mapStateToProps, the second (in his case { createPost }) is for dispatchStateToProps
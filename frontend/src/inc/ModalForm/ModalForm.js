import React from 'react';

const modalForm = props => {
	return (
		<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
			    <div className="modal-content">
		      		<div className="modal-header">
		        		<h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
				    </div>
			      	<div className="modal-body">
			        	{props.children}
			    	</div>
		      		<div className="modal-footer">
		        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
		        		<button type="button" className="btn btn-primary">Save</button>
		      		</div>
		    	</div>
			</div>
		</div>
	)
}

export default modalForm;
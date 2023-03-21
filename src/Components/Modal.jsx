import React from 'react'
import '../CSS/Modal.css'

function Model() {
  return (
    <div>
      {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">New Playlist ?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Enter Name Of The Playlist</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Enter Quote (if any) </label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
        <button type="button" class="btn btn-info">Choose Photo</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit</button>
        <button type="button" class="btn btn-primary">Save</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Model

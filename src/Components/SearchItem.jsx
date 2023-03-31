import React, { useContext } from 'react';
import '../CSS/SearchItem.css';
import store from '../store';
import { createAction } from '../action';
import PlaylistContext from '../context/ContextFiles/PlaylistContext';
import { useSelector } from 'react-redux';
import ModalAddingSongs from './ModalAddingSongs';
import NavbarContext from '../context/ContextFiles/NavbarContext';
import CardsContext from '../context/ContextFiles/CardsContext';
import { useEffect } from 'react';
import ProfileContext from '../context/ContextFiles/ProfileContext';


const SearchItem = (props) => {
  const playlistProps = useContext(PlaylistContext);
  const playingQueuee = useSelector((state) => state.playingQueue);
  const isEmpty = useSelector((state) => state.isEmpty);
  const navbarProps = useContext(NavbarContext)
  const cardsProps = useContext(CardsContext)
  const profileProps = useContext(ProfileContext)
  
  useEffect(() => {
    
    cardsProps.getUserPlaylist()
  }, [profileProps.User])

  const makeSongObj = (props) => {
    const { trackname, audioUrl, artist, imgUrl, date } = props;
    const song = {
      name: trackname,
      url: audioUrl,
      artist: artist,
      img: imgUrl,
      date: date
    };
    const action = createAction('add', song);
    store.dispatch(action);
  };

  const priorityAdd = () => {
    const { trackname, audioUrl, artist, imgUrl, date } = props;
    const song = {
      name: trackname,
      url: audioUrl,
      artist: artist,
      img: imgUrl,
      date:date
    };
    const action = createAction('priorityAdd', song);
    store.dispatch(action);
    playlistProps.isPaused(false);
    playlistProps.isPlaying(false);
    playlistProps.isClicked(true);
  };

  const openModal = (props) => {
    // console.log(props)
    navbarProps.setSongObj(props);
    const modal = document.getElementById('exampleModal2');
    const bootstrapModal = new window.bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  return (
    <>
      <div className="carouselItem">
        <img
          className="carousel-item__img"
          src={props.imgUrl}
          alt="people"
        />
        <div className="carousel-item__details">
          <div className="controls">
            <span className="fas fa-play-circle jello" onClick={() => priorityAdd(props)}></span>
            <span className="fas fa-plus-circle jello" onClick={() => makeSongObj(props)}></span>
            <span className="fa-solid fa-folder-plus jello" id='addToPlaylist' onClick={() => openModal(props)}></span>
          </div>
          <h5 className="carousel-item__details--title">{props.trackname}</h5>
          <h6 className="carousel-item__details--subtitle">{props.artist}</h6>
        </div>
      </div>

      <ModalAddingSongs />
    </>
  );
};

export default SearchItem;

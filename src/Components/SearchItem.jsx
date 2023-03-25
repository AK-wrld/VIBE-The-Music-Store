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
      <div class="carouselItem">
        <img
          class="carousel-item__img"
          src={props.imgUrl}
          alt="people"
        />
        <div class="carousel-item__details">
          <div class="controls">
            <span class="fas fa-play-circle" onClick={() => priorityAdd(props)}></span>
            <span class="fas fa-plus-circle" onClick={() => makeSongObj(props)}></span>
            <span class="fas fa-plus-circle" onClick={() => openModal(props)}></span>
          </div>
          <h5 class="carousel-item__details--title">{props.trackname}</h5>
          <h6 class="carousel-item__details--subtitle">{props.artist}</h6>
        </div>
      </div>

      <ModalAddingSongs />
    </>
  );
};

export default SearchItem;

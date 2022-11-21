import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdPersonSearch,
  MdMovie,
  MdDirectionsCarFilled,
} from 'react-icons/md';
import { IoMdJet } from 'react-icons/io';
import { Container } from './styles';
// eslint-disable-next-line import/no-unresolved
import logo from '/images/logo.svg';

export function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo Star Wars" />
      </Link>

      <nav>
        <Link to="/">
          <MdPersonSearch size={20} />
          Person
        </Link>

        <Link to="/films">
          <MdMovie size={20} />
          Films
        </Link>
        <Link to="/starships">
          <IoMdJet size={20} />
          The spaceship
        </Link>
        <Link to="/vehicles">
          <MdDirectionsCarFilled size={20} />
          Vehicles
        </Link>
      </nav>
    </Container>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { CharacterContainer, Container } from './styles';
import { useStarship } from '../../hooks/useStarship';
import { Starship } from '../../types/Starship.types';
import { getUrlId } from '../../utils/getUrlId';

export default function StartshipPage() {
  const [data, setData] = useState<Starship>();
  const { films, isLoading: isLoadingStarship, pilot } = useStarship(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/starships/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CharacterContainer>
          <div className="starships-data">
            <div className="starships-data-details">
              <h1>{data?.name}</h1>
              <p>
                Model:
                {' '}
                <span>{data?.model}</span>
              </p>

              <p>
                manufacturer:
                {' '}
                <span>{data?.manufacturer}</span>
              </p>

              <p>
                starshipclass:
                {' '}
                <span>{data?.starship_class}</span>
              </p>

              <p>
                Price:
                {' '}
                <span>
                  {data?.cost_in_credits}
                  {' '}
                  credits
                  {' '}
                </span>
              </p>

              <p>
                Speed:
                {' '}
                <span>
                  {data?.max_atmosphering_speed}
                  {' '}
                  km/h
                  {' '}
                </span>
              </p>

              <p>
                rating:
                {' '}
                <span>
                  {data?.hyperdrive_rating}
                  {' '}
                </span>
              </p>

              <p>
                MGLT:
                {' '}
                <span>{data?.MGLT}</span>
              </p>
              <p>
                Size:
                {' '}
                <span>
                  {data?.length}
                  m
                </span>
              </p>
              <p>
                Load capacity:
                {' '}
                <span>
                  {data?.cargo_capacity}
                  kg
                </span>
              </p>
              <p>
                Minimum fleet:
                {' '}
                <span>{data?.crew}</span>
              </p>
              <p>
                passengers:
                {' '}
                <span>{data?.passengers}</span>
              </p>
            </div>

            {isLoadingStarship ? (
              <Loading />
            ) : (
              <div className="starships-data-others">
                <div className="starships-data-others-data">
                  <h2>Films:</h2>
                  <ul>
                    {films.map((film) => (
                      <li key={film.name}>
                        <Link to={`/films/${getUrlId(film.url)}`}>
                          <MdMovie />
                          {film.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="starships-data-others-data">
                  <h2>Pilotos:</h2>
                  {pilot.length < 1 ? (
                    <span>It has no pilots</span>
                  ) : (
                    <ul>
                      {pilot.map((pilots) => (
                        <li key={pilots.name}>
                          <Link to={`/characters/${getUrlId(pilots.url)}`}>
                            <FaUserAlt />
                            {pilots.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="starship-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
              alt={`Imagem de ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}

import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  /* Estilos padrão do h1 */
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const ResultsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 2px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ResultItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const PlaceName = styled.div`
  font-weight: bold;
`;

export const PlaceLocation = styled.div`
  font-size: 14px;
  color: #666;
`;

export const PlaceCoordinates = styled.div`
  font-size: 12px;
  color: #999;
`;

export const NoResultMessage = styled.div`
  padding: 12px;
  text-align: center;
  color: #999;
  font-size: 14px;
`;

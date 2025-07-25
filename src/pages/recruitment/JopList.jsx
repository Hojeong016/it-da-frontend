// src/pages/recruitment/JopList.jsx
import React, { useState, useEffect } from "react";
import JopListItem from "./JopListItem";
import useRecruitmentList from "../../hooks/recruitment/useRecruitmentList";
import { getFavoriteRecruitments } from "../../utils/localStorage";
import FavoriteGuide from "../../components/recruitment/FavoriteGuide";
import "../../assets/css/JopList.css";

// 안전하게 렌더링하는 함수 추가
function safeRender(field) {
  if (typeof field === "string" || typeof field === "number") return field;
  if (Array.isArray(field)) return field.map(safeRender).join(", ");
  if (field && typeof field === "object" && "label" in field) return field.label;
  return "";
}

export default function JopList({ type, categoryEnum, searchResults, loading: searchLoading, error: searchError, selectedFilters, onFilterChange }) {
  const { data: jobsToShow, loading: listLoading, error: listError } = useRecruitmentList(categoryEnum);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  // 필터 제거 핸들러
  const handleRemoveFilter = (filterType) => {
    if (onFilterChange) {
      onFilterChange({
        ...selectedFilters,
        [filterType]: null
      });
    }
  };

  // 로컬스토리지에서 관심공고 목록 가져오기
  const loadFavorites = () => {
    const favorites = getFavoriteRecruitments();
    setFavoriteJobs(favorites);
  };

  useEffect(() => {
    loadFavorites();

    // 로컬스토리지 변경 이벤트 리스너 등록
    const handleStorageChange = (e) => {
      if (e.key === 'favoriteRecruitments') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 검색 결과 또는 전체 목록을 조회수(viewCount) 기준으로 정렬
  const getSortedJobs = (jobs) => {
    if (!jobs) return [];
    return [...jobs].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  };

  // 검색이 실행되었을 때
  if (searchResults !== undefined) {
    if (searchLoading) return <p>검색 중...</p>;
    if (searchError) return <p>검색 중 오류가 발생했습니다: {searchError}</p>;
    if (!searchResults.length) return (
      <div className="jop-list-container center-guide-wrapper">
        <p className="center-guide">검색 결과가 없습니다.</p>
      </div>
    );

    const filtered = type === "favorite"
      ? favoriteJobs // 관심 공고는 정렬에서 제외
      : getSortedJobs(searchResults);

    return (
      <div className="jop-list-container">
        {type === "favorite" && <FavoriteGuide />}
        <div className="jop-list">
          {filtered.map((job, index) => ( // index 추가
            <div className="jop-list-item" key={job.id}>
              <JopListItem job={job} index={index} />
            </div>
          ))}
        </div>
        {selectedFilters?.region && (
          <div className="search-tag region">
            {safeRender(selectedFilters.region)}
            <button onClick={() => handleRemoveFilter('region')}>×</button>
          </div>
        )}
        {selectedFilters?.category && (
          <div className="search-tag category">
            {safeRender(selectedFilters.category)}
            <button onClick={() => handleRemoveFilter('category')}>×</button>
          </div>
        )}
        {selectedFilters?.jobType && (
          <div className="search-tag job-type">
            {safeRender(selectedFilters.jobType)}
            <button onClick={() => handleRemoveFilter('jobType')}>×</button>
          </div>
        )}
      </div>
    );
  }

  // 검색이 실행되지 않았을 때 (전체 목록)
  if (listLoading) return <p>불러오는 중...</p>;
  if (listError) return <p>에러 발생: {listError}</p>;

  const filtered = type === "favorite"
    ? favoriteJobs // 관심 공고는 정렬에서 제외
    : getSortedJobs(jobsToShow);

  if (!filtered.length) {
    if (type === "favorite") {
      return (
        <div className="jop-list-container">
          <FavoriteGuide />
        </div>
      );
    }
    return (
      <div className="empty-list-guide">
        <p>조건에 맞는 채용공고가 없습니다.</p>
        <p className="empty-list-sub">필터를 변경해 더 다양한 공고를 찾아보세요!</p>
        {onFilterChange && (
          <button className="open-filter-btn" onClick={() => onFilterChange('open')}>필터 검색하기</button>
        )}
      </div>
    );
  }

  return (
    <div className="jop-list-container">
      {type === "favorite" && <FavoriteGuide />}
      <div className="jop-list">
        {filtered.map((job, index) => ( // index 추가
          <div className="jop-list-item" key={job.id}>
            <JopListItem job={job} index={index} />
          </div>
        ))}
      </div>
      {selectedFilters?.region && (
        <div className="search-tag region">
          {safeRender(selectedFilters.region)}
          <button onClick={() => handleRemoveFilter('region')}>×</button>
        </div>
      )}
      {selectedFilters?.category && (
        <div className="search-tag category">
          {safeRender(selectedFilters.category)}
          <button onClick={() => handleRemoveFilter('category')}>×</button>
        </div>
      )}
      {selectedFilters?.jobType && (
        <div className="search-tag job-type">
          {safeRender(selectedFilters.jobType)}
          <button onClick={() => handleRemoveFilter('jobType')}>×</button>
        </div>
      )}
    </div>
  );
}

export const samplePosts = [
    {
      id: 1,
      title: '우리 반 아이가 그린 그림, 어떤가요?',
      author: '햇살반선생님',
      authorBadge: '교사',
      likes: 28,
      commentsCount: 2,
      createdAt: '15분 전',
      category: '자유게시판',
      thumbnail: 'https://via.placeholder.com/150/FFF2E6/8C6D54?text=Image1',
      content: `
        <p>안녕하세요, 햇살반 담임입니다! 저희 반 아이가 오늘 이런 멋진 그림을 그렸어요.</p>
        <p>코스모스를 보고 그렸다고 하는데, 아이의 시선으로 본 세상은 이렇게 아름다운가 봐요. 😊</p>
        <img src="https://via.placeholder.com/600x400/FFF2E6/8C6D54?text=Child's+Drawing" alt="아이 그림" />
        <p>자유롭게 의견 나눠주시면 아이에게도 큰 힘이 될 것 같아요!</p>
      `,
      comments: [
          {
            id: 1,
            author: '미소천사',
            authorBadge: null,
            content: '와, 그림이 정말 따뜻하네요. 아이의 순수한 마음이 느껴져요!',
            createdAt: '2시간 전',
            likes: 5,
            replies: [
              {
                id: 3,
                author: '햇살반선생님',
                authorBadge: '교사',
                content: '좋게 봐주셔서 감사해요! 아이에게 꼭 전달할게요. ^^',
                createdAt: '1시간 전',
                likes: 2,
              },
            ],
          },
          {
            id: 2,
            author: '음악사랑원장님',
            authorBadge: '원장',
            content: '코스모스 색감이 정말 예뻐요. 다음 미술 활동에 참고해야겠어요.',
            createdAt: '30분 전',
            likes: 10,
            replies: [],
          },
      ],
    },
    {
      id: 2,
      title: '아이들 낮잠 시간에 들으면 좋은 음악 추천!',
      author: '음악사랑원장님',
      authorBadge: '원장',
      likes: 45,
      commentsCount: 0,
      createdAt: '1시간 전',
      thumbnail: null,
      category: '정보공유',
      content: '<p>조용한 클래식 음악이 아이들 정서 안정에 도움이 되는 것 같아요. 여러분은 어떤 음악을 들려주시나요?</p>',
      comments: [],
    },
    {
      id: 3,
      title: '부모님과 소통, 어떻게 하면 더 잘할 수 있을까요?',
      author: '소통전문가',
      authorBadge: '교사',
      likes: 15,
      commentsCount: 0,
      createdAt: '3시간 전',
      thumbnail: 'https://via.placeholder.com/150/E6F7FF/547A8C?text=Image2',
      category: '고민상담',
      content: '<p>부모님 상담 주간을 앞두고 고민이 많네요. 선배님들의 조언을 구합니다!</p>',
      comments: [],
    },
  ]; 
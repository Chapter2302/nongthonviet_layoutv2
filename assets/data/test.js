export const categories = () => {
  let data = {
    result: [{
        id: '1',
        name: 'Thời sự',
        alias: 'thoi-su',
        parentId: 0, //<=> don't have parent
        subs: [{
            id: '11',
            name: "Tin tức",
            alias: 'tin-tuc',
            parentId: '1',
          },
          {
            id: '12',
            name: "Kinh Tế",
            alias: 'kinh-te',
            parentId: '1',
          },
          {
            id: '13',
            name: "Xã hội",
            alias: 'xa-hoi',
            parentId: '1',
          }, {
            id: '14',
            name: "Thời Luận",
            alias: 'thoi-luan',
            parentId: '1',
          }, {
            id: '15',
            name: "Khoa học",
            alias: 'khoa-hoc',
            parentId: '1',
          }, {
            id: '16',
            name: "Văn hóa",
            alias: 'van-hoa',
            parentId: '1',
          }, {
            id: '17',
            name: "Thể thao",
            alias: 'the-thao',
            parentId: '1',
          }, {
            id: '18',
            name: "Quốc tế",
            alias: 'quoc-te',
            parentId: '1',
          },
        ]
      },
      {
        id: '2',
        name: 'Tạp chí',
        alias: 'tap-chi',
        parentId: 0,
        subs: []
      },
      {
        id: '3',
        name: 'Nông nghiệp',
        alias: 'nong-nghiep',
        parentId: 0,
        subs: [{
            id: '31',
            name: 'Nông nghiệp công nghệ cao',
            alias: 'nong-nghiep-cnc',
            parentId: '3',
          },
          {
            id: '32',
            name: 'Câu chuyện nông nghiệp',
            alias: 'cau-chuyen-nong-nghiep',
            parentId: '3',
          },
          {
            id: '33',
            name: 'Nông thôn mới',
            alias: 'nong-thon-moi',
            parentId: '3',
          }
        ]
      },
      {
        id: '4',
        name: 'Khám phá',
        alias: 'kham-pha',
        parentId: 0,
        subs: [{
            id: '41',
            name: 'Du lịch xanh',
            alias: 'du-lich-xanh',
            parentId: '4',
          },
          {
            id: '42',
            name: 'Kiến trúc xanh',
            alias: 'kien-truc-xanh',
            parentId: '3',
          },
          {
            id: '43',
            name: 'Nhìn ra thế giới',
            alias: 'nhin-ra-the-gioi',
            parentId: '4',
          },
          {
            id: '44',
            name: 'Hương vị quê nhà',
            alias: 'huong-vi-que-nha',
            parentId: '4',
          },
          {
            id: '45',
            name: 'Yêu làm vườn',
            alias: 'yeu-lam-vuon',
            parentId: '4',
          },
        ]
      },
      {
        id: '5',
        name: 'Nông sản việt',
        alias: 'nong-san-viet',
        parentId: 0,
        subs: [{
            id: '51',
            name: "Bánh dân gian",
            alias: "banh-dan-gian",
            parentId: '5'
          },
          {
            id: '52',
            name: "Hoa Lan",
            alias: "hoa-lan",
            parentId: '5'
          },
          {
            id: '53',
            name: "Con tôm",
            alias: "con-tom",
            parentId: '5'
          },
          {
            id: '54',
            name: "Trái Dứa",
            alias: "trai-dua",
            parentId: '5'
          }
        ]
      },

      {
        id: '6',
        name: 'Gương mặt',
        alias: 'guong-mat',
        parentId: 0,
        subs: [{
            id: '61',
            name: "Nhân vật",
            alias: "nhan-vat",
            parentId: '6'
          },
          {
            id: '62',
            name: "Thương hiệu",
            alias: "thuong-hieu",
            parentId: '6'
          }, {
            id: '63',
            name: "Cảm hứng",
            alias: "cam-hung",
            parentId: '6'
          }
        ]
      }

    ],
    status: 0 || 1, //faild || success
  }

  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  })

  return promise;

}



export const postsByCategory = (categoryId) => {
  const postList = [...posts].filter(post => post.cateId === categoryId);

  let data = {
    status: 1,
    result: {
      posts: postList,
    },
    page: 1,
    totalPage: 5
  }

  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  })

  return promise;
}

export const getPostByTag = () => {

}

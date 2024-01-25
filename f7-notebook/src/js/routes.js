
// import HomePage from '../pages/home.vue';
// import AboutPage from '../pages/about.vue';
// import FormPage from '../pages/form.vue';


import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';
// import leftPanel from '../components/leftpanel.vue';

import Noteboard from '../pages/noteboard.vue';
import ListPost from '../pages/notelist.vue';
import Api from '../js/Api_gql.js';

var routes = [
  {
    path: '/',
    component: Noteboard,
    props:{
      formData: {
        id: '',
        title: '',
        contents: '',
      }
    },
    
  },
  // {
  //   path: '/panel-left/',
  //   component: leftPanel,
  // },
  {
    path: '/post/:id',
    async({ router, to , resolve}){
      var app = router.app;
      app.preloader.show();
      var postId = to.params.id;
      Api.getItem(postId).then((data) => {
        //console.log("JSJJD");
        var isReadonly = false;
        if (postId !== null) {
          isReadonly = !isReadonly;
        }
        var formData = {
          id: data.id,
          title: data.title,
          contents: data.contents,
        };

        
        app.preloader.hide();
        resolve(
          {
            component: Noteboard,
          },
          {
            props: {
              formData: formData,
              isReadonly: isReadonly,
            },
          }
        );
      });
      
    },
    
  },
  {
    path: '/list/',
    async: function ({ router, to, resolve }) {
      var app = router.app;
      app.preloader.show();
      Api.fetchItems().then((data) => {
        app.preloader.hide();
        resolve(
          {
            component: ListPost,
          },
          {
            props: {
              items: data,
            },
          }
        );
      });
    }
  },
  // {
  //   path: '/form/',
  //   component: FormPage,
  // },
  // {
  //   path: '/noteboard/',
  //   component: HomePage
  // },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;

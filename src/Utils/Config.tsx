
const LIVE: string = 'https://mapp.lohiagroup.com/';
const LohiaLive: string = `${LIVE}api/v2/`;


const Login: string = `${LohiaLive}login/`;
const Feq: string = `${LohiaLive}list/faq/`;
const Content: string = `${LohiaLive}content/`;
const Profile: string = `${LohiaLive}view/profile/`;
const Banners: string = `${LohiaLive}list/banners/`;
const Product: string = `${LohiaLive}show/promotional/product/`;
const Applications: string = `${LohiaLive}list/applications/`;
const Description: string = `${LohiaLive}new_project/description/`;
const Update: string = `${LohiaLive}profile/update/`;
const Country_codes: string = `${LohiaLive}list/country_codes/`;


interface ApiEndpoints {
  Krishi_Main_url: string;
  Login: string;
  Feq: string;
  Content:string;
  Profile:string;
  Banners:string;
  Product:string;
  Applications:string;
  Description:string;
  Update:string;
  Country_codes:string;
}


const apiEndpoints: ApiEndpoints = {
  Krishi_Main_url: LohiaLive,
  Login,
  Feq,
  Content,
  Profile,
  Banners,
  Product,
  Applications,
  Description,
  Update,
  Country_codes,
};

export default apiEndpoints;

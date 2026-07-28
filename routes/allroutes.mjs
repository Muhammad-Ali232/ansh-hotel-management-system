import express from 'express'
import { AddRole, DeleteRole, EditRole, SignUp, ViewRole, ViewSingleRole,
     SignIn, AddServiceCo, ViewServiceCo, DeleteServiceCo, AddRoom, UserProfile,
      ViewRoomListing, ViewSingleRoomListing, DeleteRoomListing, EditRoomListing,  
      EditAdminProfile, AddRoomType, ViewRoomType, DeleteRoomType, EditRoomType,
       ViewSingleRoomType, CreateReservation , SaveContact, ViewContactList, DeleteContact,
     AddService, ViewServices, RoomAvailability ,
     DeleteService, ViewSingleService, EditService,
     CheckReservation, ViewAllReviews, DeleteReview,
     GetRoomBookings, ViewReservation,
     CreateReview,
     GetRoomReviews,
     GetRoomRating,
     getAdminDashboard} from '../controller/maincontroller.mjs'
import { parser } from '../CloudinaryConfig.mjs';

const routes = express.Router()

routes.post('/signup', parser.single('profilePic'), SignUp)
routes.post('/signin', SignIn)
routes.post('/addrole', AddRole)
routes.get('/viewrole', ViewRole)
routes.get('/viewrole/:id', ViewSingleRole)
routes.delete('/deleterole/:id', DeleteRole)
routes.put('/editrole/:id', EditRole)
routes.post('/addserviceco', AddServiceCo)
routes.get('/viewserviceco', ViewServiceCo)
routes.delete('/deleteserviceco/:id', DeleteServiceCo)
routes.post('/addroom', parser.single('roomPic'), AddRoom)
routes.get('/userprofile/:id', UserProfile)
routes.get('/userprofile', UserProfile)
routes.put("/edituserprofile/:id", parser.single("profilePic"), EditAdminProfile);
routes.get('/viewroomlisting', ViewRoomListing)
routes.get('/viewroomlisting/:id', ViewSingleRoomListing)
routes.delete("/deleteroomlisting/:id", DeleteRoomListing);
routes.put("/editroomlisting/:id", parser.single("roomPic"), EditRoomListing);
routes.post('/addroomtype', AddRoomType)
routes.get('/viewroomtype', ViewRoomType)
routes.delete('/deleteroomtype/:id', DeleteRoomType)
routes.put('/editroomtype/:id', EditRoomType)
routes.get('/viewroomtype/:id', ViewSingleRoomType)
routes.post('/reservation', CreateReservation)
routes.get('/viewreservation', ViewReservation)
routes.post('/contact', SaveContact)
routes.get('/contacts', ViewContactList)
routes.delete("/contact/:id", DeleteContact)
routes.post('/addservice', AddService)
routes.get('/viewservice', ViewServices)
routes.delete('/deleteservice/:id', DeleteService)
routes.put('/editservice/:id', EditService)
routes.get('/viewservice/:id', ViewSingleService)
routes.post('/availability', RoomAvailability)
routes.post('/check-reservation', CheckReservation)
routes.get("/room-bookings/:roomId", GetRoomBookings)
routes.post("/reviews", CreateReview)
routes.get("/viewreviews", ViewAllReviews)
routes.delete("/deletereview/:id", DeleteReview)
routes.get("/reviews/:roomId", GetRoomReviews)
routes.get("/reviews/rating/:roomId", GetRoomRating)
routes.get("/admindashboard", getAdminDashboard)

export default routes;
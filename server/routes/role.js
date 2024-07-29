// const express = require('express');
// const { db } = require('../firebaseAdmin');
// const router = express.Router();
// const ErrorHandler = require('../utils/errorHandler')

// const permissions = {
//   users: {
//     read: { type: Boolean, default: false },
//     create: { type: Boolean, default: false },
//     update: { type: Boolean, default: false },
//     delete: { type: Boolean, default: false }
//   },
//   documents: {
//     read: { type: Boolean, default: false },
//     create: { type: Boolean, default: false },
//     update: { type: Boolean, default: false },
//     delete: { type: Boolean, default: false },
//     assign: { type: Boolean, default: false }
//   }
// }


// // Create a new role
// router.post('/createRole', async (req, res) => {
//   const { name, isAllowedToDelete } = req.body;
//   try {
//     const rolesRef = db.collection('roles').doc();
//     await rolesRef.set({
//       // id: rolesRef.id,
//       name,
//       isAllowedToDelete: isAllowedToDelete !== undefined ? isAllowedToDelete : true,
//     })
//     // await db.collection('roles').add({ name, permissions });
//     res.status(200).send('Role created successfully');
//   } catch (error) {
//     res.status(500).send('Error creating role: ' + error.message);
//   }
// });

// // Update a role
// router.put('/updateRole', async (req, res) => {
//   const { id } = req.body;
//   const { name, isAllowedToDelete } = req.body;
//   try {
//     if(name === 'admin'|| 'superAdmin' || 'user'){
//       return next(new ErrorHandler("Default Roles cannot be changed", 403));
//     }
//     await db.collection('roles').doc(id).update({
//       name,
//       isAllowedToDelete: isAllowedToDelete,
//       updated_ts: new Date()
//     });
//     res.status(200).send('Role updated successfully');
//   } catch (error) {
//     res.status(500).send('Error updating role: ' + error.message);
//   }
// });

// // Assign a role to a user
// router.post('/assignRole', async (req, res) => {
//   const { userId, roleId } = req.body;

//   const userRef = db.collection('users').doc(userId).get();
//   if (!userRef.exists) {
//     return next(new ErrorHandler("User Not Found ", 400));

//   }

//   const rolesRef = db.collection('roles').doc(roleId).get();
//   if (!rolesRef.exists) {
//     return next(new ErrorHandler("Role Not Found ", 400));

//   }
//   try {
//     await db.collection('users').doc(userId).update({ roleId });
//     res.status(200).send('Role assigned successfully');
//   } catch (error) {
//     res.status(500).send('Error assigning role: ' + error.message);
//   }
// });

// module.exports = router;




const express = require('express');
const { db } = require('../firebaseAdmin');
const router = express.Router();
const ErrorHandler = require('../utils/errorHandler');



// Create a new role
router.post('/createRole', async (req, res, next) => {
  const { name, isAllowedToDelete } = req.body;
  try {
    const rolesRef = db.collection('roles').doc();
    await rolesRef.set({
      name,
      isAllowedToDelete: isAllowedToDelete !== undefined ? isAllowedToDelete : true,
      isActive: true,
      createdAt: new Date()
    });
    res.status(200).send('Role created successfully');
  } catch (error) {
    next(new ErrorHandler('Error creating role: ' + error.message, 500));
  }
});

// Update a role
router.put('/updateRole', async (req, res, next) => {
  const { id, name, isAllowedToDelete } = req.body;
  try {
    const roleDoc = await db.collection('roles').doc(id).get();
    if (!roleDoc.exists) {
      return next(new ErrorHandler('Role not found', 404));
    }
    const role = roleDoc.data();
    if (role.name === 'admin' || role.name === 'superAdmin' || role.name === 'user') {
      return next(new ErrorHandler("Default roles cannot be changed", 403));
    }

    await db.collection('roles').doc(id).update({
      name: name !== undefined ? name : role.name,
      isAllowedToDelete: isAllowedToDelete !== undefined ? isAllowedToDelete : role.isAllowedToDelete,
      updated_ts: new Date()
    });
    res.status(200).send('Role updated successfully');
  } catch (error) {
    next(new ErrorHandler('Error updating role: ' + error.message, 500));
  }
});

// Delete a role
router.delete('/deleteRole', async (req, res, next) => {
  const { id } = req.body;
  try {
    const roleDoc = await db.collection('roles').doc(id).get();
    if (!roleDoc.exists) {
      return next(new ErrorHandler('Role not found', 404));
    }
    const role = roleDoc.data();
    if (role.name === 'admin' || role.name === 'superAdmin' || role.name === 'user') {
      return next(new ErrorHandler("Default roles cannot be deleted", 403));
    }
    await db.collection('roles').doc(id).delete();
    await db.collection('permissions').doc(role.permissionId).delete();

    res.status(200).send('Role deleted successfully');
  } catch (error) {
    next(new ErrorHandler('Error deleting role: ' + error.message, 500));
  }
});


// Disable a role
router.put('/disableRole', async (req, res, next) => {
  const { id } = req.body;
  try {
    const roleDoc = await db.collection('roles').doc(id).get();
    if (!roleDoc.exists) {
      return next(new ErrorHandler('Role not found', 404));
    }
    const role = roleDoc.data();
    if (role.name === 'admin' || role.name === 'superAdmin' || role.name === 'user') {
      return next(new ErrorHandler("Default roles cannot be disabled", 403));
    }
    await db.collection('roles').doc(id).update({
      isActive: false,
      updated_ts: new Date()
    });
    res.status(200).send('Role disabled successfully');
  } catch (error) {
    next(new ErrorHandler('Error disabling role: ' + error.message, 500));
  }
});

// Assign a role to a user
router.post('/assignRole', async (req, res, next) => {
  const { userId, roleId } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return next(new ErrorHandler('User not found', 404));
    }

    const roleRef = db.collection('roles').doc(roleId);
    const roleDoc = await roleRef.get();
    if (!roleDoc.exists) {
      return next(new ErrorHandler('Role not found', 404));
    }

    await userRef.update({ roleId });
    res.status(200).send('Role assigned successfully');
  } catch (error) {
    next(new ErrorHandler('Error assigning role: ' + error.message, 500));
  }
});


//get all roles
router.get('/getAllRoles', async (req, res) => {
  try {
    const rolesSnapshot = await db.collection('roles').get();
    const roles = rolesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(roles);
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;

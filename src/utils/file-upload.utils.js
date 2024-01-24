const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants");
const {
  mediaConfig: {
    imageUpload: { ImagePath },
    main_upload_dir,
  },
} = require("../configs");
const {
  globalConstants: { allowedMultipleFiles },
} = require("../constants");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const fileType = file.mimetype.split('/')[0]

//     let fileLocation = `/../../public${defaultUploadPath}`

//     if (fileType === 'image') {
//       fileLocation = `/../../public${originalImagesPath}`
//     }

//     if (fileType === 'audio') {
//       fileLocation = `/../../public${originalAudioPath}`
//     }

//     if (fileType === 'video') {
//       fileLocation = `/../../public${originalVideoPath}`
//     }

//     if (!fs.existsSync(path.join(__dirname, fileLocation))) {
//       fs.mkdirSync(path.join(__dirname, fileLocation), { recursive: true })
//     }

//     cb(null, path.join(__dirname, fileLocation))
//   },
//   filename: (req, file, cb) => {
//     const fileType = file.mimetype.split('/')[0]

//     let fileLocation = `/../../public${defaultUploadPath}`
//     let seletedFilePath = defaultUploadPath

//     if (fileType === 'image') {
//       fileLocation = `/../../public${originalImagesPath}`
//       seletedFilePath = originalImagesPath
//     }

//     if (fileType === 'audio') {
//       fileLocation = `/../../public${originalAudioPath}`
//       seletedFilePath = originalAudioPath
//     }

//     if (fileType === 'video') {
//       fileLocation = `/../../public${originalVideoPath}`
//       seletedFilePath = originalVideoPath
//     }

//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_type: fileType,
//       file_path: seletedFilePath,
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })

// const uploadLogoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsPath =
//       main_upload_dir + '/' + settings_media_logo + '/' + original_folder + '/'
//     if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
//       fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
//         recursive: true,
//       })
//     }

//     cb(null, path.join(__dirname, `/../..${uploadsPath}`))
//   },
//   filename: (req, file, cb) => {
//     const uploadsPath =
//       main_upload_dir + '/' + settings_media_logo + '/' + original_folder + '/'

//     const fileLocation = path.join(__dirname, `/../..${uploadsPath}`)

//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_path: uploadsPath.replace('/public', ''),
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })

// const uploadFaviconStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsPath =
//       main_upload_dir +
//       '/' +
//       settings_media_favicon +
//       '/' +
//       original_folder +
//       '/'
//     if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
//       fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
//         recursive: true,
//       })
//     }

//     cb(null, path.join(__dirname, `/../..${uploadsPath}`))
//   },
//   filename: (req, file, cb) => {
//     const uploadsPath =
//       main_upload_dir +
//       '/' +
//       settings_media_favicon +
//       '/' +
//       original_folder +
//       '/'

//     const fileLocation = path.join(__dirname, `/../..${uploadsPath}`)

//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_path: uploadsPath.replace('/public', ''),
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })

// const uploadProfileImgStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + originalProfileImage
//     if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
//       fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
//         recursive: true,
//       })
//     }

//     cb(null, path.join(__dirname, `/../..${uploadsPath}`))
//   },
//   filename: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + originalProfileImage

//     const fileLocation = path.join(__dirname, `/../..${uploadsPath}`)
//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_path: uploadsPath.replace('/public', ''),
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })

const uploadImg = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = main_upload_dir + "/" + ImagePath;
    if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
      fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
        recursive: true,
      });
    }

    cb(null, path.join(__dirname, `/../..${uploadsPath}`));
  },
  filename: (req, file, cb) => {
    const uploadsPath = main_upload_dir + "/" + ImagePath;

    const fileLocation = path.join(__dirname, `/../..${uploadsPath}`);
    req.media_details = {
      name: Date.now() + "_" + file.originalname.replaceAll(" ", "_"),
      mime_type: file.mimetype,
      extensions: file.mimetype.split("/")[1],
      original_name: file.originalname,
      file_location: fileLocation,
      file_path: uploadsPath.replace("/public", ""),
    };
    cb(null, Date.now() + "_" + file.originalname.replaceAll(" ", "_"));
  },
});
// const uploadGasStationImg = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + backgroundImgPath
//     if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
//       fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
//         recursive: true,
//       })
//     }

//     cb(null, path.join(__dirname, `/../..${uploadsPath}`))
//   },
//   filename: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + backgroundImgPath

//     const fileLocation = path.join(__dirname, `/../..${uploadsPath}`)
//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_path: uploadsPath.replace('/public', ''),
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })
// const uploadGasStationLogo = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + logoPath
//     if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
//       fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
//         recursive: true,
//       })
//     }

//     cb(null, path.join(__dirname, `/../..${uploadsPath}`))
//   },
//   filename: (req, file, cb) => {
//     const uploadsPath = main_upload_dir + '/' + logoPath

//     const fileLocation = path.join(__dirname, `/../..${uploadsPath}`)
//     req.media_details = {
//       name: Date.now() + '_' + file.originalname.replaceAll(' ', '_'),
//       mime_type: file.mimetype,
//       extensions: file.mimetype.split('/')[1],
//       original_name: file.originalname,
//       file_location: fileLocation,
//       file_path: uploadsPath.replace('/public', ''),
//     }
//     cb(null, Date.now() + '_' + file.originalname.replaceAll(' ', '_'))
//   },
// })
const fileFilter = (req, file, cb) => {
  if (allowedMultipleFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file format, allowed formats are jpg,png,jpeg."),
      false
    );
  }
};

// const upload = multer({ storage }).single('file')
// const uploadLogo = multer({ storage: uploadLogoStorage }).single('logo')
// const uploadFavicon = multer({ storage: uploadFaviconStorage }).single(
//   'favicon',
// )
// const uploadProfileImg = multer({ storage: uploadProfileImgStorage , fileFilter }).single(
//   'profile',
// )
const uploadImgStorage = multer({ storage: uploadImg, fileFilter }).single(
  "upload_file"
);
// const uploadGasStationImgStorage = multer({
//   storage: uploadGasStationImg,
//   fileFilter,
// }).single('upload_file')

// const uploadGasStationLogoStorage = multer({
//   storage: uploadGasStationLogo,
//   fileFilter,
// }).single('upload_file')

module.exports = {
  //   uploadFile: (req, res, next) => {
  //     upload(req, res, (err) => {
  //       if (req.media_details) {
  //         req.media_details.size = req.file
  //           ? (req.file.size / 1024).toFixed(2)
  //           : 0
  //       }
  //       return next()
  //     })
  //   },
  //   uploadLogo,
  //   uploadFavicon,
  //   uploadProfileImg: (req, res, next) => {
  //     // Custom middleware to handle fileFilter error
  //     uploadProfileImg(req, res, (err) => {
  //       if (
  //         err instanceof Error &&
  //         err.message === 'Invalid file format, allowed formats are jpg,png,jpeg.'
  //       ) {
  //         // Handle fileFilter error
  //         return res.json(
  //           restApiFailure(
  //             'INVALID_FILE_FORMAT',
  //             httpsStatusCodes.BAD_REQUEST,
  //             httpResponses.BAD_REQUEST,
  //           ),
  //         )
  //       } else if (err) {
  //         return res.json(
  //           restApiFailure(
  //             'FAILED_TO_UPLOAD_PROFILE_IMAGE',
  //             httpsStatusCodes.INTERNAL_SERVER_ERROR,
  //             httpResponses.INTERNAL_SERVER_ERROR,
  //           ),
  //         )
  //       } else {
  //         return next()
  //       }
  //     })
  //   },
  uploadImgStorage: (req, res, next) => {
    // Custom middleware to handle fileFilter error
    uploadImgStorage(req, res, (err) => {
      if (
        err instanceof Error &&
        err.message === "Invalid file format, allowed formats are jpg,png,jpeg."
      ) {
        // Handle fileFilter error
        return failure(
          res,
          httpsStatusCodes.BAD_REQUEST,
          "INVALID_FILE_FORMAT"
        );
      } else if (err) {
        console.log(err)
        return failure(
          res,
          httpsStatusCodes.INTERNAL_SERVER_ERROR,
          serverResponseMessage.INTERNAL_SERVER_ERROR
        );
      } else {
        return next();
      }
    });
  },
  //   uploadGasStationImgStorage: (req, res, next) => {
  //     // Custom middleware to handle fileFilter error
  //     uploadGasStationImgStorage(req, res, (err) => {
  //       if (
  //         err instanceof Error &&
  //         err.message === 'Invalid file format, allowed formats are jpg,png,jpeg.'
  //       ) {
  //         // Handle fileFilter error
  //         return res.json(
  //           restApiFailure(
  //             'INVALID_FILE_FORMAT',
  //             httpsStatusCodes.BAD_REQUEST,
  //             httpResponses.BAD_REQUEST,
  //           ),
  //         )
  //       } else if (err) {
  //         return res.json(
  //           restApiFailure(
  //             'FAILED_TO_UPLOAD_AMENITY_BACKGROUND_IMAGE',
  //             httpsStatusCodes.INTERNAL_SERVER_ERROR,
  //             httpResponses.INTERNAL_SERVER_ERROR,
  //           ),
  //         )
  //       } else {
  //         return next()
  //       }
  //     })
  //   },
  //   uploadGasStationLogoStorage: (req, res, next) => {
  //     // Custom middleware to handle fileFilter error
  //     uploadGasStationLogoStorage(req, res, (err) => {
  //       if (
  //         err instanceof Error &&
  //         err.message === 'Invalid file format, allowed formats are jpg,png,jpeg.'
  //       ) {
  //         // Handle fileFilter error
  //         return res.json(
  //           restApiFailure(
  //             'INVALID_FILE_FORMAT',
  //             httpsStatusCodes.BAD_REQUEST,
  //             httpResponses.BAD_REQUEST,
  //           ),
  //         )
  //       } else if (err) {
  //         return res.json(
  //           restApiFailure(
  //             'FAILED_TO_UPLOAD_AMENITY_BACKGROUND_IMAGE',
  //             httpsStatusCodes.INTERNAL_SERVER_ERROR,
  //             httpResponses.INTERNAL_SERVER_ERROR,
  //           ),
  //         )
  //       } else {
  //         return next()
  //       }
  //     })
  //   }
};

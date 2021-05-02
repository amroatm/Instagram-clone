import React ,{useState} from 'react'
import { db, storage} from './firebase'
import firebase from 'firebase'
import "./ImageUpload.css"
import { Button } from '@material-ui/core';

function ImageUpload({username}) {
    const [ caption , setCaption] = useState('')
    const [ image , setImage] = useState(null)
    const [progress , setProgress] = useState(0)

    const handleChange = (e) => {
        // this will pick the FIRST file selected (to avoid selecting many)
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress Function logic here ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                // Error Fuction here
                console.log(error)
                alert(error.message)
            },
            () => {
                // complete Function ...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post the image inside the firebase storage (database)
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl : url,
                        username: username,
                    })

                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )

    }

    return (
        <div className="imageUpload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption ..." onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />

            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload

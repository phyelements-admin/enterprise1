import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Autocomplete } from '@mui/material';


const JSON_DATA = {
	"DATALOADER": {
		"ASPECT_RATIO_GROUPING": true, //retain, boolean
		"FILTER_EMPTY_ANNOTATIONS": true, //retain, boolean
		"NUM_WORKERS": 2, //retain, range: 0-3
	},
	"DATASETS": {
		"PRECOMPUTED_PROPOSAL_TOPK_TEST": 1000, //retain, range: 500-2000
		"PRECOMPUTED_PROPOSAL_TOPK_TRAIN": 2000,//retain, range: 500-2000
		"PROPOSAL_FILES_TEST": [], //retain, freeze option
		"PROPOSAL_FILES_TRAIN": [],//retain, freeze option
	},
	"BACKBONE": {
		"FREEZE_AT": 2, //retain , range 2-4
		"NAME": "build_resnet_backbone", //retain freeze
	},
	"FPN": {
		"FUSE_TYPE": "sum", //retain, string, sum or concate
		"IN_FEATURES": [], // retain
		"NORM": {
			"OUT_CHANNELS": 256 //retain, range 128 - 256
		}
	},
	"BASE_LR": 0.00025,// retain 10^-6 - 10^-2
	"BIAS_LR_FACTOR": 1.0, //retain 0-1
	"CLIP_GRADIENTS": { //retain
		"CLIP_TYPE": "value", //retain str
		"CLIP_VALUE": 1.0, //retain 0-1
		"ENABLED": false, //retain bool
		"NORM_TYPE": 2.0 //retain 1-10
	},
	"LR_SCHEDULER_NAME": "WarmupMultiStepLR", //retain str, CosineLR, One Cycle LR, Cyclic LR
	"MAX_ITER": 30, //retain 1-10000
	"MOMENTUM": 0.9, //retain 0-1
	"NESTEROV": false, //retain bool
	"WARMUP_FACTOR": 0.001,//retain 0-1
	"WARMUP_ITERS": 1000,//retain 0-10000
	"WARMUP_METHOD": "linear",//retain string
	"WEIGHT_DECAY": 0.0001, //retain 0-1
	"WEIGHT_DECAY_BIAS": null,//retain bool
	"WEIGHT_DECAY_NORM": 0.0,//retain 0-1
	"DETECTIONS_PER_IMAGE": 100,//retain 50-500
	"data_root": "/home/satish27may_gmail_com/ComputerVisionPipelines/app/data_root",//hide
	"dataset_name": "YOLO_imgs_renamed_reduced",//hide
	"num_classes": 4,//hide
	"class_names": [//hide
		"AluCan",
		"Glass",
		"HDPEM",
		"PET"
	],
	"image_file_extension": "jpg",//hide
	"annotation_file_extension": "txt",//hide
	"shuffle_data_order": true,//retain bool
	"bbox_type": "XYWH_YOLO", //retain XYXY_YOLO, XYXY_COCO
	"data_split_ratios": {//retain float 0-1
		"train": 0.7,
		"valid": 0.2,
		"test": 0.1
	},
	"image_augmentations": {//hide
		"Resize": {
			"enabled": true,
			"args": {
				"shape": [
					512,
					512
				],
				"interp": "BILINEAR"
			}
		},
		"RandomBrightness": {
			"enable": true,
			"args": {
				"intensity_min": 0.9,
				"intensity_max": 1.1
			}
		},
		"RandomFlip": {
			"enable": true,
			"args": {
				"prob": 0.5,
				"horizontal": false,
				"vertical": true
			}
		},
		"RandomCrop": {
			"enable": true,
			"args": {
				"crop_type": "absolute",
				"crop_size": [
					640,
					640
				]
			}
		}
	},
	"cloud_strg_bucket_name": "object-detection-demo",//hide
	"cloud_dataset_name": "YOLO_imgs_renamed_reduced.zip",//hide
	"cloud_dataset_metadata_name": "YOLO_imgs_renamed_reduced_metadata.json",//hide
	"cloud_model_dir": "MODEL_OUTPUT_DIR.zip",//hide
	"model_config_name": "COCO-Detection/rpn_R_50_C4_1x.yaml",//hide
	"num_workers": 2,//hide
	"batch_size": 2,//hide
	"base_lr": 0.00025,//hide
	"max_iterations": 300,//hide
	"solver_steps": [],//hide
	"batch_size_per_image": 128,//hide
	"model_output_dir": "MODEL_OUTPUT_DIR"//hide
}


function JsonForm(props) {
	const [jsonData, setJsonData] = useState(JSON_DATA);

	const checkType = (parentkey, key, value) => {
		switch (typeof value) {
			case 'boolean':
				return checkBoolean(parentkey, key, value);
			case 'string':
				return checkString(parentkey, key, value);
			case 'number':
				return checkNumber(parentkey, key, value);
			case 'object':
				return checkObject(parentkey, key, value);
			default:
				return ''
		}
	}

	const getDepth = (parentkey) => {
		return parentkey.split('.').length;
	}

	// Generate Boolean Field
	const checkBoolean = (parentkey, item, value) => {
		return (
			<FormGroup className={`margin-left-${getDepth(parentkey)} `}>
				<FormControlLabel control={<Switch name={parentkey} checked={value === true ? true : false} value={value === true ? true : false} onChange={onChangeBoolean.bind(null, value)} />} label={item} />
			</FormGroup>
		)
	}
	const onChangeBoolean = (value, e) => {
		setJsonData({ ...setProperty(jsonData, e.target.name, !value) })
	}

	// Generate Multiple Value's Field
	const checkArray = (parentkey, item, value) => {
		return (
			<div className={`margin-left-${getDepth(parentkey)} `}>
				<Autocomplete
					multiple
					autoSelect
					freeSolo
					limitTags={4}
					options={value}
					getOptionLabel={option => option + ''}
					onChange={onChnageAutoComplete.bind(null, parentkey)}
					style={{
						width: 500,
					}}
					value={value}
					renderInput={(params) => (
						<TextField {...params} label={item} name={parentkey} placeholder={item} />
					)}
					sx={{ width: '100%' }}
				/>
			</div>
		)
	}

	const onChnageAutoComplete = (parentkey, event, values) => {
		const allValues = [];
		values.forEach(value => {
			if (!isNaN(value)) {
				allValues.push(+value)
			} else {
				allValues.push(value)
			}
		})
		setJsonData({ ...setProperty(jsonData, parentkey, allValues) })
	}

	// Generate String Field
	const checkString = (parentkey, item, value) => {
		return <div className={`margin-left-${getDepth(parentkey)} `}>
			<TextField onChange={handleChange} name={parentkey} label={item} variant="outlined" value={value} type={'text'} />
		</div>
	}

	// Generate Number Field
	const checkNumber = (parentkey, item, value) => {
		return <div className={`margin-left-${getDepth(parentkey)} `}>
			<TextField onChange={handleChange} name={parentkey} label={item} variant="outlined" value={value} type={'number'} />
		</div >
	}

	// Check value is object Or Array
	const checkObject = (parentkey, item, value) => {
		if (Array.isArray(value)) {
			return checkArray(parentkey, item, value)
		} else {
			for (let i in value) {
				const level = parentkey.split('.').length
				if (typeof value[i] === 'object' && !Array.isArray(value[i])) {
					getFormData.push({ padding: `${40 * level}px`, title: i, field: '', parentkey })
				}
				getFormData.push({ padding: '50px', title: null, field: checkType(parentkey + '.' + i, i, value[i]), parentkey })
			}
		}
	}

	const setProperty = (obj, path, value) => {
		const [head, ...rest] = path.split('.');

		return {
			...obj,
			[head]: rest.length
				? setProperty(obj[head], rest.join('.'), value)
				: value
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (!isNaN(value)) {
			setJsonData({ ...setProperty(jsonData, name, +value) });
		} else {
			setJsonData({ ...setProperty(jsonData, name, value) });
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(jsonData);
	}

	const getFormData = []
	const headKeys = []
	for (const item in jsonData) {
		if (typeof jsonData[item] === 'object' && !Array.isArray(jsonData[item])) {
			getFormData.push({ padding: '20px', title: null, field: '', parentkey: item })
		}
		headKeys.push(item)
		getFormData.push({ padding: '20px', title: null, field: checkType(item, item, jsonData[item]), parentkey: item })
	}

	return (

		<form onSubmit={handleSubmit}>
			{
				headKeys.map((key, index) => {
					return (
						<div key={index} style={{ border: '1px solid black', margin: '20px 0', padding: '20px' }}>
							<h5>{key}</h5>
							{getFormData.map((item, index) => {
								if (item.parentkey.split('.')[0] === key) {
									return (
										<div key={index} style={{ paddingLeft: item.padding }}>
											<h5>{item.title}</h5>
											<div style={{ margin: '20px' }} key={index}>{item.field}</div>
										</div>
									)
								}
							})}
						</div>
					)
				})
			}
			<Button type='submit' color="primary" variant="contained">Submit</Button>
		</form>
	);
}

export default JsonForm;

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
	return (
		<div className='w-full'>
			{label && <label className='inline-block mb-1 pl-1'>{label}</label>}
			<Controller
				name={name || "content"}
				control={control}
				render={({ field: { onChange } }) => (
					<Editor
						initialValue={defaultValue}
						apiKey='9e3x15lp4yyozaya64va2trm66lkl7qidkn815ccfpt1q1zl'
						init={{
							initialValue: defaultValue,
							height: 500,
							menubar: true,
							plugins: [
								"image",
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"help",
								"wordcount",
							],
							toolbar:
								"undo redo | blocks | " +
								"bold italic forecolor | bullist numlist outdent indent | " +
								"removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						onEditorChange={onChange}
					/>
				)}
			/>
		</div>
	);
}

export default RTE;

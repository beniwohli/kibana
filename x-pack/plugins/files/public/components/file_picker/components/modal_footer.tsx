/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiModalFooter } from '@elastic/eui';
import { css } from '@emotion/react';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';

import { UploadFile } from '../../upload_file';
import type { Props as FilePickerProps } from '../file_picker';
import { useFilePickerContext } from '../context';
import { i18nTexts } from '../i18n_texts';
import { Pagination } from './pagination';
import { SelectButton, Props as SelectButtonProps } from './select_button';

interface Props {
  kind: string;
  onDone: SelectButtonProps['onClick'];
  onUpload?: FilePickerProps['onUpload'];
}

export const ModalFooter: FunctionComponent<Props> = ({ kind, onDone, onUpload }) => {
  const { state } = useFilePickerContext();
  const onUploadStart = useCallback(() => state.setIsUploading(true), [state]);
  const onUploadEnd = useCallback(() => state.setIsUploading(false), [state]);
  return (
    <EuiModalFooter>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          width: 100%;
        `}
      >
        <div
          css={css`
            place-self: stretch;
          `}
        >
          <UploadFile
            onDone={(n) => {
              state.selectFile(n.map(({ id }) => id));
              state.resetFilters();
              onUpload?.(n);
            }}
            onUploadStart={onUploadStart}
            onUploadEnd={onUploadEnd}
            kind={kind}
            initialPromptText={i18nTexts.uploadFilePlaceholderText}
            multiple
            compressed
          />
        </div>
        <div
          css={css`
            place-self: center;
          `}
        >
          <Pagination />
        </div>
        <div
          css={css`
            place-self: end;
          `}
        >
          <SelectButton onClick={onDone} />
        </div>
      </div>
    </EuiModalFooter>
  );
};

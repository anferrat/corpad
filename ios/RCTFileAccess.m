//
//  RCTFileAccess.m
//  Corpad
//
//  Created by Andrei on 2023-11-13.
//

#import "RCTFileAccess.h"

@implementation FileAccessModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(startAccessingSecurityScopedResource:(NSURL *)fileURL
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSError *error;
    BOOL success = [fileURL startAccessingSecurityScopedResource];
    if (success) {
        self.accessedURL = fileURL; // Store the accessed URL
        resolve(@(YES));
    } else {
        NSString *errorMessage = [NSString stringWithFormat:@"Failed to access security-scoped resource: %@", [error localizedDescription]];
        reject(@"START_ACCESS_FAILED", errorMessage, nil);
    }
}

RCT_EXPORT_METHOD(stopAccessingSecurityScopedResource:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (self.accessedURL) {
        [self.accessedURL stopAccessingSecurityScopedResource];
        self.accessedURL = nil; // Clear the stored URL
        resolve(@(YES));
    } else {
        reject(@"URL_NOT_FOUND", @"No URL is currently accessed.", nil);
    }
}

@end

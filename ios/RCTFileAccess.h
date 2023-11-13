//
//  RCTFileAccess.h
//  Corpad
//
//  Created by Andrei on 2023-11-13.
//

#import "React/RCTBridgeModule.h"

@interface FileAccessModule : NSObject <RCTBridgeModule>

@property (nonatomic, strong) NSURL *accessedURL;

@end
